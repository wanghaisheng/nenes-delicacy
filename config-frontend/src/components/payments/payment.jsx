import './payment.scss'
import { useEffect, useState } from 'react';
import { get, getCookie } from '../../utils';
import { PaystackButton } from 'react-paystack'
import { useSelector } from 'react-redux';
import { useQuery, useQueryClient } from 'react-query';
import { lazy } from "react";
import { useNavigate } from 'react-router-dom';


const Preview = lazy(() => import("../preview/preview"))


const Payment = () => {

  const queryClient = useQueryClient()
  const shipping = useSelector((state) => state.getShipping);
  const cart = queryClient.getQueryData(['pre-cart'])
  const [success, setSuccess] = useState(false)
  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const navigate = useNavigate()
  const total = Number(cart.total) + Number(shipping.price)
  const amount = shipping.routeProtection? total + 1000 : total

  console.log(shipping)


  useQuery({
    queryKey: ['order', success],
    queryFn: () => get(`cart/createOrder?sessionid=${getCookie()}`),
    enabled: success
  })


const handleSubmit = () => {
  setSuccess(true)
  navigate('/')
}

  const componentProps = {
    email: shipping.email,
    amount: amount * 100,
    metadata: {
      phone: shipping.phone,
    },
    publicKey,
    text: `Pay NGN${Intl.NumberFormat("en-US").format(amount)}`,
    onSuccess: () => handleSubmit(),
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  }

    return ( 
        <div className="payment-wrapper">
            <div>
              <Preview/>
              <section className='shipping-method'>
                <h4>Shipping method</h4>
                <div>
                  <span>
                    <input type="radio" name='priority-overnigt' id='priority'/>
                    <span className="custom-radio"></span>
                  </span>
                  <label htmlFor="priority"> 
                    <div>Priority Overnight - Saturday Delivery</div>
                    <div className='shipping-method_desc'>We bake fresh and overnight ship your items based on your chosen delivery date.</div>
                  </label>
                  <span>FREE</span>
                </div>

                <p>Our products are baked fresh and packed safely to ensute the best quality. Priority overnight shipping ensures your deserts arrive on your desired delivery date.</p>
              </section>
              <PaystackButton className='paystack-button' {...componentProps}/>
            </div>
        </div>
     );
}

export default Payment;