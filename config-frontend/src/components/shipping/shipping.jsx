import './shipping.scss'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from '../../axios'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux' 
import { useNavigate } from 'react-router-dom'
import 'react-day-picker/dist/style.css'
import { getCookie } from '../../utils'
import { DayPicker }  from 'react-day-picker'
import Preview from '../preview/preview'


const Shipping = () => {

    const date = new Date()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const [selected, setSelected] = useState()
    const [day, month, year]  = [date.getDate(), date.getMonth(), date.getFullYear()]
    const nextMonth = new Date(year, month + 1)
    const shipping = useSelector((state) => state.getShipping)

    queryClient.refetchQueries({queryKey: ['shipping'], exact: true})
    

    const { data, refetch} = useQuery({
        queryKey: ['shipping', selected],
        queryFn: () => axios.put(`shipping/update_shipping/?sessionID=${getCookie()}`, {selected}),
        enabled: false
    })


    useEffect(() => { 
        if (data) navigate('/payment')
        
        const deliveryDate = shipping? new Date(shipping['deliveryDate']) : ''
        if (deliveryDate) {
            setSelected(deliveryDate)
        }
    }, [data, shipping])


    return ( 
        <section className="shipping">  
            <div>
                <Preview />
                <div className='calender'>
                    <div>
                        <h1>Choose a delivery date for your order</h1>
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
                    <a href='/pre-cart' onClick={() => dispatch(Blur())}>Back to information</a>
                </div>
                <button disabled={selected? false : true} onClick={() => refetch()}>
                    <span>Continue to payment</span>
                    <ion-icon name="arrow-forward"/>
                </button>
            </div>
        </section>
     );
}

export default Shipping;