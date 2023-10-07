import './layouts.scss'
import { useState } from 'react'
import { primaryURL } from '../../axios'
import {useQuery } from 'react-query'
import 'react-day-picker/dist/style.css'
import { DayPicker }  from 'react-day-picker'

const Shipping = () => {

    const date = new Date() 
    const [selected, setSelected] = useState()
    const [day, month, year]  = [date.getDate(), date.getMonth(), date.getFullYear()]
    const nextMonth = new Date(year, month + 1 )

    const preview = JSON.parse(window.sessionStorage.getItem('shipping'))

    const disalbedDays = {
        from: new Date(year, month, 1),
        to: new Date(year, month, day + 2)
    }

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['distance'],
        queryFn: () => {
            return primaryURL.post('distance', {state: preview.state, lga: preview.lga})
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {JSON.stringify(error)}</div>
    

    return ( 
        <section className="shipping">
            <div>
                <div className='preview'>
                    <ul>
                        <li>User</li>
                        <li>{preview.firstName} {preview.lastName}</li>
                        <li>Change</li>
                    </ul>
                    <ul>
                        <li>Contacts</li>
                        <ul>
                            <li>{preview.email}</li>
                            <li>{preview.phone}</li>
                        </ul>
                        <li>Change</li>
                    </ul>
                    <ul>
                        <li>Ship to</li>
                        <li>{preview.address}</li>
                        <li>Change</li>
                    </ul>
                </div>

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
                    disabled={disalbedDays}
                    />
                </div>
            </div>

            <div className="buttons">
                <div>
                    <ion-icon name="arrow-back-sharp"/>
                    <a href='/pre-cart' onClick={() => dispatch(Blur())}>Back to information</a>
                </div>
                <button>
                    <span>Continue to payment</span>
                    <ion-icon name="arrow-forward"/>
                </button>
            </div>
        </section>
     );
}

export default Shipping;