import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { get, getCookie } from '../../utils';
import Cookie from 'universal-cookie';    
import Precart from '../precart/precart';
import { LayoutFooter } from '../checkout/checkoutNav';
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, Elements } from '@stripe/react-stripe-js';
import '../checkout/layouts.scss'


const Pay = () => {
  const stripe = useStripe();
  const cookie = new Cookie()
  const navigate = useNavigate()
  const preview = JSON.parse(window.sessionStorage.getItem('shipping'))
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
    queryFn: () => get(`cart/createOrder?sessionid=${getCookie()}&email=${preview.email}`),
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
            <div className='payment-successful checkout-layout  '>
              <div>
                <div className='mobile-logo'>
                  <img src="images/mobile-view-logo.jpg" alt="" />
                </div>

                <div className='order-details'>
                  <div>

                    <div>
                      <div><ion-icon name="checkmark-circle-outline"></ion-icon></div>
                      <div>
                        <h1>Thank you {preview.firstName}!</h1>
                      </div>
                    </div>
                    
                    <div className='confirmation'>
                      <h1>Your order is confirmed</h1>
                      <span>You'll recieve a confirmation email with your order number shortly</span>
                    </div>
   
                    <div className='order-info'>
                      <h1>Customer Information</h1>
                      <ul>
                        <li>
                          <h2>Contact Information</h2>
                          <li>{preview.email}</li>
                          <li>{preview.phone}</li>
                        </li>
                        <li>
                          <h2>Shipping address</h2>
                          <li>{preview.firstName} {preview.lastName}</li>
                          <li>{preview.address}</li>
                          <li>{preview.lga}, {preview.state}</li>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                <LayoutFooter/>
              </div>

              <Precart />
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