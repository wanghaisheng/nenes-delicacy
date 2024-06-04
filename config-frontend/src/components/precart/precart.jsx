import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import {  Details, shipping } from '../../actions';
import { routeProtection, get, getCookie, placeHolder } from '../../utils';
import { useLocation } from 'react-router-dom';
import { useQueryClient, useQuery} from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from "react-redux";
import Cookie from 'universal-cookie';     
import route from '/icons/route.svg'
import { v4 as uuid4 } from "uuid"; 
import './precart.scss'  


const Precart = () => {
    const dispatch = useDispatch()
    const cookie = new Cookie()
    const queryClient = useQueryClient()
    const cursor = useRef()
    const location = useLocation()
    const precart = useRef(null)
    const cart = queryClient.getQueryData(['carts'])
    const [protection, setProtection] = useState(cookie.get('route-protection'))
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})
    const [carts, setCart] = useState(protection? [routeProtection, ...cart] : cart)  
    const hidden = useSelector((state) => state.getOrderDetails)
    const isCheckout = location.pathname == '/checkout'
   

    const {data, isLoading, isError} = useQuery({
        queryKey: ['shipping'],
        queryFn: () => get(`shipping/get_shipping?sessionID=${getCookie()}`),
        placeholderData: placeHolder
    })  
    

    const handleChange = () => { 
        cursor.current.style.cursor = 'wait'

        setTimeout(() => {
    
            if (carts[0] !== routeProtection) {
                cookie.set('route-protection', uuid4())
                setCart([routeProtection, ...cart])

            } else {
                cookie.remove('route-protection', {path: '/'})
                setCart(cart)
            }

            setProtection(cookie.get('route-protection')) 
            cursor.current.style.cursor = 'pointer'
        }, 700)  
    }


    //dispatches the grandtotal and shipping information to the redux store
    useEffect(() => {
        if (data) {
            dispatch(shipping(data))
        }
    }, [data])

   
    //returns JSX element based on a satisfied condition
    const shippingInfo = () => {

        if (isCheckout) {
            return (
            <div className='calculate-next'>Calculated at next step </div>
        )}

        else {
            return (
            <div>
                <FontAwesomeIcon icon={faNairaSign } />
                {Intl.NumberFormat("en-US").format(Number(data.price))} 
            </div>)
        }
    }
     

    return (  
        <section className="precart">
             {isMobile? 
                <div className="order-summary">
                    <div onClick={() => {
                                        dispatch(Details());
                                        precart.current.classList.toggle('show-cart')
                                    }}>
                        <div>
                            <div>{hidden? 'Show' : 'Hide'} order summary</div>
                            <div><ion-icon name="chevron-down-outline"></ion-icon></div>
                        </div>

                        <div>
                            <span><FontAwesomeIcon icon={faNairaSign} /></span>
                            <span>
                                {Intl.NumberFormat("en-US").format(cart.total)}
                            </span>
                        </div>
                    </div>
                </div>
                : ''
            }
            
            <div ref={precart} className="precart-wrapper">
                <div>
                    <div className="precart-outer">
                    {carts.cartitems.map(cart => (
                        <div key={cart.id}>
                            <div className="precart-image">
                                <div>{cart.quantity}</div>
                                <img src={`${import.meta.env.VITE_SERVER_URL + cart.item.image}`} alt="" />
                            </div>
                            <div className="precart-info">
                                <h1>{cart.item.name}</h1>
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

                    <div className="pricing">
                    <div>
                        <h1>Subtotal</h1>
                        <p>
                            <FontAwesomeIcon icon={faNairaSign } />
                            {Intl.NumberFormat("en-US").format(carts.total)}
                        </p>
                    </div>
                    <div>
                        <h1>Shipping</h1>
                        <div className={data? "shipping-info":""}>
                            {shippingInfo()}
                        </div>
                    </div>
                    <div className="total">
                        <span>Total</span>
                        <p>
                            <FontAwesomeIcon icon={faNairaSign} />
                            {Intl.NumberFormat("en-US").format(
                                isCheckout? cart.total : Number(cart.total) + Number(data? data.price: 0)
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

                        <div ref={cursor} className={protection? "toggle":"deselect"} onClick={(el) => {handleChange(el); }}>
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