import './checkout.scss';
import { Blur } from '../../actions';
import { get, post, getCookie, placeHolder } from '../../utils'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useState, useRef } from 'react'; 


const Checkout = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const visibility = useRef();
    const queryclient = useQueryClient();
    const navigate = useNavigate();
    const { shippingData } = useOutletContext();
    const [state, setState] = useState({state:'', lga: []})
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
        cacheTime: 0,
        enabled: !!formData,

        onSuccess: () => {
            queryclient.invalidateQueries({queryKey: ['shipping']})
            navigate('/shipping')
        }
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
        if (data && shippingData?.data) {
            const query = data.find(
                state => state.state === shippingData.data?.state)
            setState(query)
            setLGA(shippingData.data?.lga)
        }
    }, [data, shippingData?.data])



    useEffect(() => {

        if (Shipping.isError || location.state) {
            setTimeout(() => {
                visibility.current.remove()
                navigate(location.pathname, { replace: true, state: null })
            }, 8000 )
            
        }}, [Shipping, location])


    const handleChange = () => {
        const query = data.find(
            state => state.state === e.target.value)
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
                    <div>
                        <div ref={visibility}>
                            {Shipping.isError&& "An error occurred, Please try again"}
                            {location.state?.data && location.state.data}
                        </div>

                        <h1>Shipping Adddress</h1>
                        <form onSubmit={handleSubmit} method='post'>
                            <div className='customer'>
                                <input ref={nameInputRef} type="text" name='firstName' placeholder='First name' defaultValue={shippingData.data?.firstName} required/>
                                <input type="text" name='lastName' placeholder='Last name' defaultValue={shippingData.data?.lastName} required/>
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
                                    {state?.lga.map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        
                            <input ref={addressInputRef} type="text" name='address' placeholder='Address' defaultValue={shippingData.data?.address} required/>
                            <input ref={contactInputRef} type="text" name='email' placeholder='Email' defaultValue={shippingData.data?.email} required/>
                            <input type="text" name='phone' placeholder='Phone' defaultValue={shippingData.data?.phone} required/>
                            <div className="buttons">
                                <div>
                                    <ion-icon name="arrow-back-sharp"/>
                                    <a href='/' onClick={() => dispatch(Blur())}>Back to home</a>
                                </div>
                        
                                <button type='submit' disabled={Shipping.isFetching}>
                                    {Shipping.isFetching?
                                        <span>Loading...</span> :
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