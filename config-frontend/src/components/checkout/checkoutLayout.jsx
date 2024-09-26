import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { lazy, Suspense  } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { shipping } from '../../actions';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive'
import './layouts.scss'
import { placeHolder, 
        getCookie,
        routeProtection, 
        get } from '../../utils';




const Precart = lazy(() => import('../precart/precart'))


const CheckoutPreloader = () => {

    return (
        <section className='checkout__preloader'>
            <div>
                <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1721250342/spinner-trans-bg_r89iew.gif" alt="preloader" />
                <pre>Loading, please wait</pre>
            </div>
        </section>
    )
}


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


    const { data } = useQuery({
        queryKey: ['shipping'],
        queryFn: () => get(`shipping/get_shipping?sessionID=${getCookie()}`),
        placeholderData: placeHolder
    })
    

    const preCart = useQuery({
        queryKey: ['pre-cart'],
        queryFn: () =>  get(`cart/getCart/?sessionid=${getCookie()}`), 
        staleTime: Infinity,
        placeholderData: { cartitems: [''], total: 0 },
        select: (cart) => {
            
            if (data?.routeProtection && cart.cartitems.length != 0) {
                return {
                    cartitems: [routeProtection, ...cart.cartitems],
                    total: Number(cart.total) + routeProtection.price,
                }
            } return cart
        }
    })

    
     // dispatches the shipping information to the redux store
     useEffect(() => {

        if (preCart.data?.cartitems.length === 0) {
            navigate('/')
        }

        if (data) {
            dispatch(shipping(data))

        }}, [data, preCart.data])



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
    
 

    return ( 
        <section className="checkout-layout">
            <Suspense fallback={<CheckoutPreloader />}>
                <div className='layout-wrapper'>
                    <div>
                        <header>
                            <div className="mobile-logo">
                                <a href="/">
                                    <img src='/images/mobile-view-logo.jpg'/>
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
                        <Outlet context={{ preCart }}/>
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
                <Precart preCart={preCart}/>  
                {mobile? 
                    <div>
                        <div className="mobile-logo">
                            <a href="/">
                                <img src='https://res.cloudinary.com/dqdtnitie/image/upload/v1721255425/mobile-logo_udgqxl.jpg'/>
                            </a>
                        </div>
                    </div> : null
                    }
            </Suspense>
        </section>
     );
}

export { CheckoutLayout, CheckoutPreloader};