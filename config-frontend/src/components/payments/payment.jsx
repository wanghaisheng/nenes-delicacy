import './payment.scss'
import { primaryURL } from '../../axios'
import { useState } from 'react';
import {loadStripe} from "@stripe/stripe-js";
import { SmallLoader } from '../preloader/preloader';
import { useSelector } from 'react-redux';
import { v4 as uuid4 } from "uuid"; 
import { useQuery, useQueryClient } from 'react-query';
import { lazy } from "react";
import { useStripe, Elements, PaymentElement, useElements} from "@stripe/react-stripe-js";
import { Error, Spinner } from '../preloader/preloader';


const stripe = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_INTENT);
const Preview = lazy(() => import("../preview/preview"))


const Payment = () => {

  const queryClient = useQueryClient()
  const shipping = useSelector((state) => state.getShipping);
  const cart = queryClient.getQueryData(['carts'])

  
  const {isLoading, isError, data, refetch} = useQuery({
    queryKey: ['payment'],
    queryFn: () => primaryURL.post('payment', {
      amount: Math.ceil((Number(shipping.price) + Number(cart.total)) * 100), 
    }),
    retry: 1,
    enabled: !!shipping,
  })
  

  if (isLoading) return <Spinner text='loading'/>

  if (isError) return <Error refetch={refetch}/>


  if (data) {

    const options = {  
      clientSecret: data? data.data: undefined,  
      appearance: {
          theme: 'flat',
          variables: { colorPrimaryText: '#262626' }
      }
    }
  
    return (
      <Elements key={uuid4()} stripe={stripe} options={options}>
        <CheckoutPage />
      </Elements>
    )
  }

};



const CheckoutPage = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (event) => {

    event.preventDefault();

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/payment-status',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {}

    setLoading(false)
  };


    return ( 
        <div className="payment-wrapper">
            <div>
              <Preview/>
              {errorMessage?
               <div className="error-message">
                  <div><ion-icon name="alert-circle-outline"></ion-icon></div>
                  {errorMessage && <div>{errorMessage}</div>}
                </div> : ""
              }
              <form onSubmit={handleSubmit}>
                  <PaymentElement />
                  <button className={loading? 'opaque': ''} disabled={!stripe} onClick={() => setLoading(true)} type="submit">
                    {loading? <SmallLoader/>:'Submit'}
                  </button>
              </form>
            </div>
        </div>
     );
}

export default Payment;