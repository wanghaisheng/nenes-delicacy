import './checkout.scss';
import { Blur } from '../../actions';
import { get, post, getCookie, placeHolder } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { shipping } from '../../actions';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from 'react-query'
import { useEffect, useState, useRef } from 'react'; 


const Checkout = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const visibility = useRef();
    const navigate = useNavigate();
    const {preCart} = useOutletContext()
    const shippingData = useSelector((state) => state.getShipping)
    const [state, setState] = useState({state:'', lga: []})
    const [refetch, setRefetch] = useState(false)
    const [lga, setLGA] = useState(undefined)
    const [formData, setFormData] = useState(undefined)
    const nameInputRef = useRef(null);
    const contactInputRef = useRef(null);
    const addressInputRef = useRef(null);

    
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
        // Get the state from location
        const { state } = location;
        const focusField = state?.focus;

        // Focus the corresponding input based on the state
        if (focusField === 'name' && nameInputRef.current) {
            nameInputRef.current.focus();

        } else if (focusField === 'contact' && contactInputRef.current) {
            contactInputRef.current.focus();

        } else if (focusField === 'address' && addressInputRef.current) {
            addressInputRef.current.focus();
        }

    }, [location]);


    useEffect(() => {

        if (Shipping.isFetched && Shipping.isSuccess) {
            dispatch(shipping(Shipping.data.data))
            navigate('/shipping')
        }

        if (data && shippingData.id) {
            const result = data.filter(
                state => state.state === shippingData.state)[0]
            setState(result)
            
            const filtered_lga = result? result.lga.filter(
                lga => lga === shippingData.lga)[0] : ''
            setLGA(filtered_lga)}

    }, [data, shippingData, Shipping])


    useEffect(() => {
        if (refetch && formData) {
            Shipping.refetch()
        }

        if (Shipping.isError || location.state) {
            setTimeout(() => {
                visibility.current.classList.add('not-visible')
                navigate(location.pathname, { replace: true, state: null })
            }, 8000 )
            
        }}, [
        refetch, 
        formData,
        Shipping.isError,
        location.state
    ])


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
                    <div>
                        <div ref={visibility} className={Shipping.isError || location.state?.data ? 'visible': 'not-visible'}>
                            {Shipping.isError? 'Network Error: Check your internet connection' :
                            location.state?.data}
                        </div>

                        <h1>Shipping Adddress</h1>
                        <form onSubmit={handleSubmit} method='post'>
                            <div className='customer'>
                                <input ref={nameInputRef} type="text" name='firstName' placeholder='First name' defaultValue={shippingData.firstName} required/>
                                <input type="text" name='lastName' placeholder='Last name' defaultValue={shippingData.lastName} required/>
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
                        
                            <input ref={addressInputRef} type="text" name='address' placeholder='Address' defaultValue={shippingData.address} required/>
                            <input ref={contactInputRef} type="text" name='email' placeholder='Email' defaultValue={shippingData.email} required/>
                            <input type="text" name='phone' placeholder='Phone' defaultValue={shippingData.phone} required/>
                            <div className="buttons">
                                <div>
                                    <ion-icon name="arrow-back-sharp"/>
                                    <a href='/' onClick={() => dispatch(Blur())}>Back to home</a>
                                </div>
                        
                                <button type='submit' 
                                        disabled={Shipping.isFetching || preCart.status !== 'success'}>
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