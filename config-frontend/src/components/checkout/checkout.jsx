import './checkout.scss';
import { Blur } from '../../actions';
import { get, post, getCookie, placeHolder } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'; 


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shipping = useSelector((state) => state.getShipping)
    const [state, setState] = useState({state:'', lga: []})
    const [refetch, setRefetch] = useState(false)
    const [lga, setLGA] = useState(undefined)
    const [formData, setFormData] = useState(undefined)

    const { data } = useQuery({
        queryKey: ['states'],
        queryFn: () => get('states')
    })


    const Shipping = useQuery({
        queryKey: ['shipping', {type:'post'}],
        queryFn: () => post(`shipping/add_shipping/?sessionID=${getCookie()}`, formData),
        placeholderData: placeHolder,
        cacheTime: 0,
        enabled: !!formData
    })


    useEffect(() => {

        if (Shipping.isFetched && Shipping.isSuccess) {
            navigate('/shipping')
        }

        if (data && shipping.id) {
            const result = data.filter(
                state => state.state === shipping.state)[0]
            console.log(result)
            setState(result)
            
            const filtered_lga = result? result.lga.filter(
                lga => lga === shipping.lga)[0] : ''
            setLGA(filtered_lga)}

    }, [data, shipping, Shipping])


    useEffect(() => {
        if (refetch && formData) {
            Shipping.refetch()
        }
    }, [refetch, formData])



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
        setRefetch(true)
    }
    
    return ( 
            <section className='checkout'>
                <div className="address"> 
                    
                    <div className={Shipping.isError? 'shipping-error': 'hide'}>
                        Network Error: Check your internet connection
                    </div>
                    
                    <div>
                        <h1>Shipping Adddress</h1>
                        <form onSubmit={handleSubmit} method='post'>
                            <div className='customer'>
                                <input type="text" name='firstName' placeholder='First name' defaultValue={shipping.firstName} required/>
                                <input type="text" name='lastName' placeholder='Last name' defaultValue={shipping.lastName} required/>
                            </div>
                            <div className="state">
                                <select required onChange={handleChange} value={state?.state}>
                                    <option value="" hidden>States</option>
                                    {data?.map(state => (
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
                        
                            <input type="text" name='address' placeholder='Address' defaultValue={shipping.address}required/>
                            <input type="text" name='email' placeholder='Email' defaultValue={shipping.email} required/>
                            <input type="text" name='phone' placeholder='Phone' defaultValue={shipping.phone} required/>
                            <div className="buttons">
                                <div>
                                    <ion-icon name="arrow-back-sharp"/>
                                    <a href='/' onClick={() => dispatch(Blur())}>Back to home</a>
                                </div>
                        
                                <button type='submit' disabled={Shipping.isFetching}>
                                    {Shipping.isFetching?
                                        <><span>Loading...</span></> :
                                        <>
                                            <span>Continue to Shipping</span>
                                            <ion-icon name="arrow-forward"/>
                                        </>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
     );
}

export default Checkout;