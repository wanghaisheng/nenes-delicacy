import './checkout.scss';
import { Blur } from '../../actions';
import { get, post, getCookie } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '../preloader/preloader';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'; 


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shipping = useSelector((state) => state.getShipping)
    const [state, setState] = useState({lga: []})
    const [lga, setLGA] = useState(undefined)
    const [formData, setFormData] = useState(undefined)


    const { data, isLoading } = useQuery({
        queryKey: ['states'],
        queryFn: () => get('states')   
    })


    const Shipping = useQuery({
        queryKey: ['shipping', formData],
        queryFn: () => post(`shipping/add_shipping/?sessionID=${getCookie()}`, formData),
        enabled: !!formData
    })

    console.log(shipping, data)


    useEffect(() => {

        if (Shipping.data) {
            navigate('/shipping')
        }

        if (shipping && data) {
            const result = data.filter(
                state => state.state === shipping.state)[0]
            setState(result)
        
            const filtered_lga = result? result.lga.filter(
                lga => lga === shipping.lga)[0] : ''
            setLGA(filtered_lga) 
        }

    }, [
        data, 
        Shipping.data, 
        shipping
    ]) 


    if (isLoading) { 
        return <Spinner text={'Loading'}/>
    }


    const handleChange = (e) => {
        const query = data.filter(
            state => state.state === e.target.value)[0]
        setState(query)
    }  


    const handleSubmit = (e) => {
        e.preventDefault()
 
        const data = new FormData(e.target)
        const formdata = Object.fromEntries(data.entries())  
        formdata.state = state.state
        formdata.lga = lga

        setFormData(formdata)
    }

    
    return ( 
            <section className='checkout'>
                <div className="address">       
                    <h1>Shipping Adddress</h1>
                    <form onSubmit={handleSubmit} method='post'>
                        <div className='customer'>
                            <input type="text" name='firstName' placeholder='First name' defaultValue={shipping? shipping.firstName: ""} required/>
                            <input type="text" name='lastName' placeholder='Last name' defaultValue={shipping? shipping.lastName:""} required/>
                        </div>

                        <div className="state">
                            <select required onChange={handleChange} value={state?state.state:""}>
                                <option value="" hidden>States</option>
                                {data.map(state => (
                                    <option key={state.id} value={state.state}>{state.state}</option>
                                ))}  
                            </select>

                            <select required onChange={(e) => setLGA(e.target.value)} value={lga}>
                                <option value="" hidden>LGA</option>
                                {state.lga.map(item => (
                                    <option key={item} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        
                        <input type="text" name='address' placeholder='Address' defaultValue={shipping? shipping.address: ''}required/>
                        <input type="text" name='email' placeholder='Email' defaultValue={shipping? shipping.email: ''} required/>
                        <input type="text" name='phone' placeholder='Phone' defaultValue={shipping? shipping.phone:""} required/>


                        <div className="buttons">
                            <div>
                                <ion-icon name="arrow-back-sharp"/>
                                <a href='/' onClick={() => dispatch(Blur())}>Back to home</a>
                            </div>
                            
                            <button type='submit' disabled={Shipping.isLoading}>
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