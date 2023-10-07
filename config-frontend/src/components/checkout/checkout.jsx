import './checkout.scss';
import { Blur } from '../../actions';
import { get } from '../../utils'
import {useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { useQuery } from 'react-query'
import { useState } from 'react';

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({lga: []})
    const [lga, setLGA] = useState()


    const states = useQuery({
        queryKey: ['states'],
        queryFn: () => get('states')
    })

    if (states.isLoading) {
        return <div>Loading...</div>
     }
    
     if (states.isError) {
        return <pre>Something happened {JSON.stringify(states.error)}</pre>
     }
  

    const handleChange = (e) => {
        const query = states.data.filter(
            state => state.state === e.target.value)[0]
        setState(query)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const formdata = Object.fromEntries(data.entries())
        formdata.state = state.state
        formdata.lga = lga
        
        window.sessionStorage.setItem(
            'shipping', JSON.stringify(formdata)
            )

        navigate('/shipping')
    }
 

    return ( 
            <section className='checkout'>
                <div className="shipping">
                    
                    <h1>Shipping Adddress</h1>
                    <form onSubmit={handleSubmit} method='post'>
                        <div className='customer'>
                            <input type="text" name='firstName' placeholder='First name' required/>
                            <input type="text" name='lastName' placeholder='Last name' required/>
                        </div>

                        <div className="state">
                            <select required onChange={handleChange}>
                                <option value="" hidden>States</option>
                                {states.data.map(state => (
                                    <option key={state.id} value={state.state}>{state.state}</option>
                                ))}
                            </select>

                            <select required onChange={(e) => setLGA(e.target.value)}>
                                <option value="" hidden>LGA</option>
                                {state.lga.map(item => (
                                    <option key={item.id} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        
                        <input type="text" name='address' placeholder='Address' required/>
                        <input type="text" name='email' placeholder='Email' required/>
                        <input type="text" name='phone' placeholder='Phone' required/>

                        <div className="buttons">
                            <div>
                                <ion-icon name="arrow-back-sharp"/>
                                <a href='/' onClick={() => dispatch(Blur())}>Back to home</a>
                            </div>
                            
                            <button type='submit'>
                                <span>Continue to Shipping</span>
                                <div>
                                    <ion-icon name="arrow-forward"/>
                                </div>
                            </button> 
                            
                        </div>
                    </form>
                </div>
            </section>
     );
}

export default Checkout;