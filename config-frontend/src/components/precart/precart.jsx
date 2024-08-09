import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { shipping } from '../../actions';
import { getCookie } from '../../utils';
import axios from '../../axios';
import { useLocation } from 'react-router-dom';
import { useQueryClient, useMutation} from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { useDispatch, useSelector } from "react-redux";  
import route from '/icons/route.svg'
import './precart.scss'  


const Precart = ({preCart}) => { 
    const dispatch = useDispatch()
    const cursor = useRef()
    const queryclient = useQueryClient()
    const location = useLocation()
    const precart = useRef(null)
    const [hidden, setHidden] = useState(false)
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})
    const data = useSelector((state) => state.getShipping)
    const isCheckout = location.pathname == '/checkout'


  
    const updateProtection = useMutation({
        mutationFn: async (data) => {
            cursor.current.classList.add('updating_route')
            const route = await axios.put('shipping/route_protection/', data)
            return route
    
        }, onSuccess: (res) => {
            const protection = JSON.parse(res.data.toLowerCase())

            queryclient.setQueryData(['shipping'], (shippingData) => {
                shippingData.routeProtection = protection
                dispatch(shipping(Object.create(shippingData)))
                return shippingData
            })
        }, onSettled: () => {
            cursor.current.classList.remove('updating_route')
        }
    })


    const Error = () => {
        return (
            <div className='error'>
                <div>
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <pre>Error loading pre-order items</pre>
                    <button onClick={() => preCart.refetch()}>
                        <pre>Try again</pre>
                    </button>
                </div>
            </div>
    )}

   
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
            {preCart.isError? 
                <Error /> :
                <>
                    {isMobile? 
                        <div className="order-summary">
                            <div onClick={() => {
                                                setHidden(!hidden);
                                                precart.current.classList.toggle('show-cart')
                                            }}>
                                <div>
                                    <div>{hidden? 'Hide' : 'Show'} order summary</div>
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
                                                <LazyLoadImage
                                                    src={import.meta.env.VITE_CLOUD_URL + cart.item.image}
                                                    effect='blur'
                                                    alt={cart.item.name}
                                                    placeholderSrc={import.meta.env.VITE_CLOUD_URL + cart.item.lazyImage}
                                                />
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
                                        {Intl.NumberFormat("en-US").format(preCart?.data.total)}
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
                                            isCheckout? Number(preCart?.data.total) : Number(preCart?.data.total) + Number(data? data.price: 0)
                                            )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="route-protection-wrapper">
                            <div>
                                <div ref={cursor} className='select-wrapper'>
                                    <div
                                         className={data.routeProtection? "toggle":"deselect"}
                                         onClick={() => new updateProtection.mutate({
                                            'sessionID': getCookie()})
                                            }>
                                        <div>
                                            <div className="thumb"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="route-protection">
                                    <img src={route} alt="" />
                                    <span>Package Protection</span>
                                    <p>Against loss, theft or damage in transit and instant resolution</p>
                                </div>
                            </div>
                            <p>By deselecting ROUTE package protection, customer acknowledges that Nene's delicacy will not be held liable for lost, broken or damaged properties.</p>
                        </div>
                    </div>
                </>
            }
        </section>
     );
}

export default Precart;