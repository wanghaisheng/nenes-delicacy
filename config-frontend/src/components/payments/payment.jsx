import './payment.scss'
import { useEffect, useState } from 'react';
import { get, getCookie } from '../../utils';
import { PaystackButton } from 'react-paystack'
import { useQuery } from '@tanstack/react-query';
import Preview from '../preview/preview';
import { lazy } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';


const Payment = () => {

  const { preCart, shippingData } = useOutletContext()
  const [success, setSuccess] = useState(false)
  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const navigate = useNavigate()
  const amount = Number(preCart.data?.total) + Number(shippingData.data?.price)

  
  useQuery({
    queryKey: ['order', success],
    queryFn: () => get(`cart/createOrder?sessionid=${getCookie()}`),
    enabled: success,

    onSuccess: () => {
      document.cookie = `sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      navigate('/')
    }
  })


  useEffect(() => {

    if (shippingData === 'none') {
      navigate('/checkout', { 
          state: { data: "Cannot start a payment session without adding an address"}
      }
    )} else if (!shippingData.data?.deliveryDate) {
        navigate('/shipping', { 
          state: { data: "Kindly set a delivery date before proceeding to payment"}
      })
    }
      
  }, [shippingData.data])



  const componentProps = {
    email: shippingData.data?.email,
    amount: amount * 100,
    metadata: {
      phone: shippingData.data?.phone,
    },
    publicKey,
    text: `Pay NGN${Intl.NumberFormat("en-US").format(amount)}`,
    onSuccess: () => setSuccess(true),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }


  return ( 
        <div className="payment-wrapper">
            <div>
              <Preview />
              <section className='shipping-method'>
                <h4>Shipping method</h4>

                <div>
                  <div>
                    <span>
                      <input type="radio" name='priority-overnigt' id='priority'/>
                      <span className="custom-radio"></span>
                    </span>
                    
                    <label htmlFor="priority">
                      <div>Priority Overnight - {new Date(shippingData.data?.deliveryDate).toLocaleDateString('en-US', { weekday: 'long' })} Delivery</div>
                      <div className='shipping-method_desc'>We bake fresh and overnight ship your items based on your chosen delivery date.</div>
                    </label>
                  </div>
                  <span>FREE</span>
                </div>

                <p>Our products are baked fresh and packed safely to ensute the best quality. Priority overnight shipping ensures your deserts arrive on your desired delivery date.</p>
                <PaystackButton className='paystack-button' {...componentProps}/>
              </section>
            </div>
        </div>
     );
}

export default Payment;