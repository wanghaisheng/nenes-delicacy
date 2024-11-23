import './shipping.scss'
import { useState, useEffect, useRef } from 'react'
import dateFormat from 'dateformat'
import { useQuery } from '@tanstack/react-query'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import 'react-day-picker/dist/style.css'
import { getCookie } from '../../utils'
import { DayPicker }  from 'react-day-picker'
import Preview from '../preview/preview'


const Shipping = () => {

    const date = new Date()
    const navigate = useNavigate()
    const location = useLocation()
    const visibility = useRef()
    const { shippingData } = useOutletContext()
    const [selected, setSelected] = useState(null)
    const [day, month, year]  = [date.getDate(), date.getMonth(), date.getFullYear()]
    const nextMonth = new Date(year, month + 1)


    useQuery({
        queryKey: ['shipping', selected],
        queryFn: () => axios.put(`shipping/update_shipping/?sessionID=${getCookie()}`, {
            selected: dateFormat(selected, 'yyyy-mm-dd')
        }),
        enabled: !!selected
    })


    useEffect(() => {    

        if (Object.keys(shippingData.data).length === 0) {
            navigate('/checkout', { 
                state: { data: "Cannot start a shipping session without adding an address"}
            })}

        const deliveryDate = shippingData.data&& new Date(shippingData.data['deliveryDate'])
        const nextTwoDays = new Date(year, month, day + 2)
        if (deliveryDate > nextTwoDays) {
            setSelected(deliveryDate)
        }

    }, [shippingData?.data])


    useEffect(() => {
        if (location.state) {
            setTimeout(() => {
                visibility.current.classList.add('not-visible')
                navigate(location.pathname, { replace: true, state: null })
            }, 5000 )   
        }}
    , [location.state])

    
    return ( 
            <section className="shipping">  
                <div>
                    <Preview />
                    
                    <div className='calender'>
                        <div ref={visibility} className={location.state? 'visible': 'not-visible'}>
                            {location.state?.data}
                        </div>
                        <div>
                            <h1>Choose a delivery date <br/>for your order</h1>
                        </div>
                        <DayPicker
                        mode='single'
                        fromMonth={date}
                        selected={selected}
                        onSelect={setSelected}
                        toMonth={nextMonth}
                        disabled={{from: new Date(year, month, 1), 
                                to: new Date(year, month, day + 2)}
                                }
                        />
                    </div>
                </div>

                <div className="buttons">
                    <div>
                        <ion-icon name="arrow-back-sharp"/>
                        <a href='/checkout'>Back to information</a>
                    </div>

                    <button onClick={() => navigate('/payment')}>
                        <span>Continue to payment</span>
                        <ion-icon name="arrow-forward"/>
                    </button>
                </div>
            </section>
     );
}

export default Shipping;