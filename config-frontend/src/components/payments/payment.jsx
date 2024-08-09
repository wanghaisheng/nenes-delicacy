import './payment.scss'
import { useEffect, useState } from 'react';
import { get, getCookie } from '../../utils';
import { PaystackButton } from 'react-paystack'
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { lazy } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';


const Preview = lazy(() => import("../preview/preview"))


const Payment = () => {

  const { preCart } = useOutletContext()
  const shipping = useSelector((state) => state.getShipping);
  const [success, setSuccess] = useState(false)
  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const navigate = useNavigate()
  const amount = Number(preCart?.data?.total) + Number(shipping.price)

  
  useQuery({
    queryKey: ['order', success],
    queryFn: () => get(`cart/createOrder?sessionid=${getCookie()}`),
    enabled: success
  })


  useEffect(() => {

    if (shipping === 'none') {
      navigate('/checkout', { 
          state: { data: "Cannot start a payment session without adding an address"}
      }
    )} else if (!shipping.deliveryDate)
      navigate('/shipping', { 
        state: { data: "Kindly set a delivery date before proceeding to payment"}
    })
  }, [shipping])



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
                    <div>Priority Overnight - {new Date(shipping.deliveryDate).toLocaleDateString('en-US', { weekday: 'long' })} Delivery</div>
                    <div className='shipping-method_desc'>We bake fresh and overnight ship your items based on your chosen delivery date.</div>
                  </label>
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