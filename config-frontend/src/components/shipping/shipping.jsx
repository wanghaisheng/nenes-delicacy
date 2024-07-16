import './shipping.scss'
import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'
import { useQuery } from 'react-query'
import axios from '../../axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux' 
import 'react-day-picker/dist/style.css'
import { getCookie } from '../../utils'
import { DayPicker }  from 'react-day-picker'
import Preview from '../preview/preview'


const Shipping = () => {

    const date = new Date()
    const navigate = useNavigate()
    const [selected, setSelected] = useState()
    const [day, month, year]  = [date.getDate(), date.getMonth(), date.getFullYear()]
    const nextMonth = new Date(year, month + 1)
    const shipping = useSelector((state) => state.getShipping)

    useQuery({
        queryKey: ['shipping', selected],
        queryFn: () => axios.put(`shipping/update_shipping/?sessionID=${getCookie()}`, {
            selected: dateFormat(selected, 'yyyy-mm-dd')
        }),
        enabled: !!selected
    })

    useEffect(() => { 
        const deliveryDate = shipping? new Date(shipping['deliveryDate']) : ''
        const nextTwoDays = new Date(year, month, day + 2)
        if (deliveryDate > nextTwoDays) {
            setSelected(deliveryDate)
        }
    }, [shipping])

    

    return ( 
        <section className="shipping">  
            <div>
                <Preview />
                <div className='calender'>
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