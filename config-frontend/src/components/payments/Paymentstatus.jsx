import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { get, getCookie } from '../../utils';
import { useSelector } from 'react-redux';
import Precart from '../precart/precart';
import { LayoutFooter } from '../checkout/checkoutNav';
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, Elements } from '@stripe/react-stripe-js';
import '../checkout/layouts.scss'


const Pay = () => {
  const stripe = useStripe();
  const navigate = useNavigate()
  const shipping = useSelector((state) => state.getShipping);
  const [intent, setIntent] = useState({status: ''})


  useEffect(() => {
   
    if (!stripe) {
      return;
    }

    // Retrieve the "payment_intent_client_secret" query parameter appended to
    // your return_url by Stripe.js
    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    // Retrieve the PaymentIntent
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({paymentIntent}) => {
          setIntent(paymentIntent)
      });

  }, [stripe]);


  const {data, isLoading, isError} = useQuery({
    queryKey: ['order', intent.status],
    queryFn: () => get(`cart/createOrder?sessionid=${getCookie()}&id=${intent.id}`),
    retry: 1,
    enabled: intent.status === 'succeeded'
})



// if (data) {
//   cookie.remove('sessionid')
// }

  
const getStatus = () => {

    switch (intent.status) {
        case 'succeeded':
          return (
              <div className='order-details'>
                  <div>
                    <div><ion-icon name="checkmark-circle-outline"></ion-icon></div>
                    <div>
                      <h1>Thank you {shipping.firstName}!</h1>
                    </div>
                  </div>
                    
                  <div className='confirmation'>
                    <h1>Your order is confirmed</h1>
                    <span>You'll recieve a confirmation email with your order number shortly</span>
                  </div>
              </div>
            )

        case 'processing':
          return (
            <div>
              <div>
                <img src='/icons/Fading-lines.gif' alt="woman medidating" />
              </div>

              <div className='payment-details'>   v
                <h1>Processing</h1>
                <p>Please wait...</p>
              </div>
            </div>
          )

        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          navigate('/payment')
          break;

        default:
            return (
              <div></div>
          )
      }
  }

    return (
      <section data-payment-status>
        {getStatus()}
      </section>
    )  
};


const PaymentStatus = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_SECRET_PAYMENT_INTENT);

  return (
  <Elements stripe={stripePromise}>
      <Pay />
  </Elements>
  )
}


export default PaymentStatus;