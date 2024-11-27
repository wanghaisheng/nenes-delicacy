import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { Spinner, Error} from '../preloader/preloader';
import { useMediaQuery } from 'react-responsive'
import './layouts.scss'
import {
        getCookie,
        routeProtection, 
        get } from '../../utils';


const Precart = lazy(() => import('../precart/precart'))



function CheckoutLayout() {

    const mobile = useMediaQuery({query: '(max-width: 767px)'});
    const [ref, setRef] = useState(null);
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onRefSet = useCallback(ref => {
        setRef(ref);
        ref?.current;
    })
    

    const links = [
        {
            id: 0,
            title: 'Information',
            ref: '/checkout',
            hasNextSibling: true
        }, 

        {
            id: 1,
            title: 'Shipping',
            ref: '/shipping',
            hasNextSibling: true
        },

        {
            id: 2,
            title: 'Payment',
            ref: '/payment',
            hasNextSibling: false
        }, 
    ]


    const shippingData = useQuery({
        queryKey: ['shipping'],
        queryFn: () => get(`shipping/get_shipping?sessionID=${getCookie()}`),
    })
    

    const preCart = useQuery({
        queryKey: ['pre-cart'],
        queryFn: () =>  get(`cart/getCart/?sessionid=${getCookie()}`), 
        select: (cart) => {

            if (cart.cartitems.length === 0 || !shippingData.data?.routeProtection) {
                return cart;
            }

            return {
                cartitems: [routeProtection, ...cart.cartitems],
                total: Number(cart.total) + routeProtection.price,
            };
        },

        onSuccess: (cart) => {
            if (cart.cartitems.length === 0) {
                navigate('/', { 
                    state: { data: "Cannot begin checkout with an empty cart"}
                })
            }
        },
    })




    useEffect(() => {
        ref?.childNodes.forEach(node => { 
            if (node.firstChild.href === window.location.href) {
                node.classList.add('active')
                node.classList.remove('disabled')
                
                let nextElement = node.nextElementSibling;
                while (nextElement) {
                    nextElement.classList.add('disabled')
                    nextElement = nextElement.nextElementSibling
                }
            } else {
                node.classList.remove('active')
            }
        })

    }, [location.pathname, ref])



    if (preCart.isLoading) {
        return (
            <Spinner message="Loading, please wait"/>
        )
    }


    if (preCart.isError) {
        return (
            <Error refetch={refetch} message={'We’re having trouble loading your cart'}/>
        )
    }
    

    return ( 
        <section className="checkout-layout">
            
            <div className='layout-wrapper'>
                <div>
                    <header>
                        <div className="mobile-logo">
                            <a href="/">
                                <img src={import.meta.env.VITE_CLOUD_URL + '/image/upload/v1731314786/nene_s_delicacy_logo_black_rnle2z.png'}/>
                            </a>
                        </div>
                    
                        <div className="navigation">
                                <ul ref={onRefSet}>
                                    {links.map(link => (
                                        <li key={link.id} onClick={(e) => {
                                            e.target.parentElement.classList.contains('disabled')?
                                            e.preventDefault() : ''
                                        }}>
                                            <a href={link.ref}>{link.title}</a>
                                            {link.hasNextSibling? <ion-icon name="chevron-forward-outline"></ion-icon> : ''}
                                        </li>
                                    ))}
                                </ul>
                        </div>
                    </header>
                    <Outlet context={{ preCart, shippingData }}/>
                    <footer className='layout-footer'>
                        <ul>
                            <a href="">
                                <li>Privacy policy</li>
                            </a>
                            <a href="">
                                <li>Refund policy</li>
                            </a>
                            <a href="">
                                <li>Terms of service</li>
                            </a>
                        </ul>
                    </footer>
                </div>
            </div>
            <Precart preCart={preCart} data={shippingData.data}/>  
            {mobile? 
                <div>
                    <div className="mobile-logo logo-ismobile">
                        <a href="/">
                            <img src={import.meta.env.VITE_CLOUD_URL + '/image/upload/v1731314786/nene_s_delicacy_logo_black_rnle2z.png'}/>
                        </a>
                    </div>
                </div> : null
            }
           
        </section>
     );
}

export { CheckoutLayout };