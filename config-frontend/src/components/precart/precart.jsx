import { useRef, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getCookie } from '../../utils';
import axios from '../../axios';
import spinner from '../../lotties/spinner';
import Lottie from 'react-lottie';
import { useLocation } from 'react-router-dom';
import { useQueryClient, useMutation} from '@tanstack/react-query'
import { useMediaQuery } from 'react-responsive' 
import route from '/icons/route.svg'
import './precart.scss'  


const Precart = ({preCart, data}) => { 
    const cursor = useRef()
    const queryclient = useQueryClient()
    const location = useLocation()
    const precart = useRef(null)
    const [hidden, setHidden] = useState(false)
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})
    const isCheckout = location.pathname == '/checkout'


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: spinner,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };


    const updateProtection = useMutation({
        mutationFn: async (data) => {
            cursor.current.classList.add('updating_route')
            const route = await axios.put('shipping/route_protection/', data)
            return route
    
        }, onSuccess: (res) => {
            const protection = JSON.parse(res.data.toLowerCase())
          

            queryclient.setQueryData(['shipping'], (shippingData) => ({
                ...shippingData,
                routeProtection: protection,
            }));

        }, onSettled: () => {
            cursor.current.classList.remove('updating_route')
        }
    })


   
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
                    <span className="naira-logo"><img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="" /></span>
                    <span>{Intl.NumberFormat("en-US").format(Number(data.price))}</span> 
                </div>
        )}}
     

    return (  
        <section className="precart">
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
                                <span className='naira-logo'><img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="naira logo" /></span>
                                <span>
                                    {Intl.NumberFormat("en-US").format(
                                        Number(preCart.data? preCart.data.total: 0) + (isCheckout? 0 : Number(data?.price))
                                    )}
                                </span>
                            </div>
                        </div>
                    </div> : null }
                
                <div ref={precart} className="precart-wrapper">
                    <div>
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
                                            <span className='naira-logo'><img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="naira logo" /></span>
                                            <span>{Intl.NumberFormat("en-US").format(cart.price)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="pricing">
                                <div>
                                    <h1>Subtotal</h1>
                                    <p>
                                        <span className='naira-logo'><img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="naira logo" /></span>
                                        {Intl.NumberFormat("en-US").format(preCart.data? preCart.data.total: 0)}
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
                                        <span className='naira-logo'><img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="naira logo" /></span>
                                        {Intl.NumberFormat("en-US").format(
                                            preCart.data? (
                                                isCheckout? Number(preCart.data.total) : Number(preCart.data.total) + Number(data? data.price: 0)
                                            ) : 0
                                            )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="route-protection-wrapper">
                            <div>
                                <div ref={cursor} className='select-wrapper'>
                                    {updateProtection.isLoading && (
                                         <Lottie 
                                            options={defaultOptions}
                                            height={15}
                                            width={15}
                                        />
                                    )}
                                    <div
                                            className={data?.routeProtection? "toggle":"deselect"}
                                            onClick={() => updateProtection.mutate({
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
        </section>
     );
}

export default Precart;