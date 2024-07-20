import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { shipping } from '../../actions';
import { get, getCookie, placeHolder,routeProtection } from '../../utils';
import axios from '../../axios';
import { useLocation } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation} from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from "react-redux";  
import route from '/icons/route.svg'
import './precart.scss'  


const Precart = () => { 
    const dispatch = useDispatch()
    const cursor = useRef()
    const queryclient = useQueryClient()
    const location = useLocation()
    const precart = useRef(null)
    const [hidden, setHidden] = useState(false)
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})
    const isCheckout = location.pathname == '/checkout'


    const { data } = useQuery({
        queryKey: ['shipping'],
        queryFn: () => get(`shipping/get_shipping?sessionID=${getCookie()}`),
        placeholderData: placeHolder
    })  

    

    const preCart = useQuery({
        queryKey: ['pre-cart'],
        queryFn: () =>  get(`cart/getCart/?sessionid=${getCookie()}`), 
        staleTime: Infinity,
        placeholderData: {cartitems: [], total: 0},
        select: (cart) => {
            if (data.routeProtection) {
                return {
                    cartitems: [routeProtection, ...cart.cartitems],
                    total: Number(cart.total) + routeProtection.price
                }
            } return cart
        }
    })


    const updateProtection = useMutation({
        mutationFn: async (data) => {
            const route = await axios.put('shipping/route_protection/', data)
            return route
    
        }, onSuccess: (res) => {
            const protection = JSON.parse(res.data.toLowerCase())

            queryclient.setQueryData(['shipping'], (shippingData) => {
                shippingData.routeProtection = protection
                dispatch(shipping(Object.create(shippingData)))
                return shippingData
            })
        }
    })


    // dispatches the shipping information to the redux store
    useEffect(() => {
        if (data) {
            dispatch(shipping(data))
        }
    }, [data])

   
    //returns JSX element based on a satisfied condition
    const shippingInfo = () => {

        if (isCheckout) {
            return (
                <div className='calculate-next'>
                    Calculated at next step 
                </div> )}

        else { 
            return (
                <div>
                    <FontAwesomeIcon icon={faNairaSign } />
                    {Intl.NumberFormat("en-US").format(Number(data.price))} 
                </div>
            )}}
     

    return (  
        <section className="precart">
             {isMobile? 
                <div className="order-summary">
                    <div onClick={() => {
                                        setHidden(!hidden);
                                        precart.current.classList.toggle('show-cart')
                                    }}>
                        <div>
                            <div>{hidden? 'Show' : 'Hide'} order summary</div>
                            <div><ion-icon name="chevron-down-outline"></ion-icon></div>
                        </div>

                        <div>
                            <span><FontAwesomeIcon icon={faNairaSign} /></span>
                            <span>
                                {Intl.NumberFormat("en-US").format(
                                    Number(preCart.data.total) + (isCheckout? 0 : Number(data.price))
                                )}
                            </span>
                        </div>
                    </div>
                </div> : null }
            
            <div ref={precart} className="precart-wrapper">
                <div>
                    {preCart.isLoading || preCart.isPlaceholderData? 
                        <div className='precart__loader'>
                        {[...Array(4)].map((x, index)=> (
                            <div key={index}>
                                <div></div>
                                
                                <div>
                                    <ul>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                        </div>  
                    : 
                        <div className="precart-outer">
                            {preCart.data.cartitems.map(cart => (
                                <div key={cart.id}>
                                    <div className="precart-image">
                                        <div>{cart.quantity}</div>
                                        <img src={`${import.meta.env.VITE_SERVER_URL + cart.item.image}`} alt="" />
                                    </div>
                                    <div className="precart-info">
                                        <h4>{cart.item.name}</h4>
                                        <span>{cart.item.description}</span>
                                    </div>
                                    <div className="precart-price">
                                        <div>
                                            <span><FontAwesomeIcon icon={faNairaSign} /></span>
                                            <span>{Intl.NumberFormat("en-US").format(cart.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    <div className="pricing">
                    <div>
                        <h1>Subtotal</h1>
                        <p>
                            <FontAwesomeIcon icon={faNairaSign } />
                            {Intl.NumberFormat("en-US").format(preCart.data.total)}
                        </p>
                    </div>
                    <div>
                        <h1>Shipping</h1>
                        <div className={data? "shipping-info":""}>
                            {shippingInfo()}
                        </div>
                    </div>
                    <div className="total">
                        <h1>Total</h1>
                        <p>
                            <FontAwesomeIcon icon={faNairaSign} />
                            {Intl.NumberFormat("en-US").format(
                                isCheckout? Number(preCart.data.total) : Number(preCart.data.total) + Number(data? data.price: 0)
                                )}
                        </p>
                    </div>
                    </div>
                </div>

                <div className="route-protection-wrapper">
                    <div>
                        <div className="route-protection">
                            <img src={route} alt="" />
                            <span>Package Protection</span>
                            <p>Against loss, theft or damage in transit and instant resolution</p>
                        </div>

                        <div ref={cursor} 
                            className={data.routeProtection? "toggle":"deselect"} 
                            onClick={() => new updateProtection.mutate({
                                'sessionID': getCookie()})
                                }>
                            <div>
                                <div className="thumb"></div>
                            </div>
                        </div>
                    </div>
                    <p>By deselecting ROUTE package protection, customer acknowledges that Nene's delicacy will not be held liable for lost, broken or damaged properties.</p>
                </div>
            </div>
        </section>
     );
}

export default Precart;