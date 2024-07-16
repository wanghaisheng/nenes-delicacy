import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useQuery } from 'react-query';
import { get, getCookie } from '../../utils';
import { useMediaQuery } from 'react-responsive'
import { lazy, Suspense, useEffect, useState, useRef} from 'react';
import { Blur, Menu, menuReset } from '../../actions';
import './navbar.scss';


const Cart= lazy(() => import("../cart/cart"));


const ShippingNav = () => {
    return (
        <div className='shipping-info'>
            <h2>Shipping Information</h2>
            <p> We do not dispatch products today or within the next two days,
                to ensure that we consistently deliver fresh items to our customers.
            </p>
        </div>
    )
}


const Navbar = () => {
                          
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartIcon = useRef()
    const [prevElement, setPrevElement] = useState()
    const cartState = useSelector(state => state.getBlurred)
    const menuState = useSelector(state => state.getMenu)
    const isMobile = useMediaQuery({query: '(max-width: 912px)'}); 
    const isDesktop = useMediaQuery({query: '(min-width: 767px)'});


    const { data } = useQuery({
        queryKey: ['carts'],
        queryFn: () =>  get(`cart/getCart/?sessionid=${getCookie()}`), 
        staleTime: Infinity,
        retry: 1
    }, )


    useEffect(() => {
        if (cartState || isDesktop) {
            dispatch(menuReset(false));
        }
    }, [cartState, isDesktop])



    const handleClick = (e) => {
        navigate('/')
        e.preventDefault()
    }


    const showAccordian = (e) => {
        const currElement = e.currentTarget;

        if (prevElement && prevElement !== currElement) {
            prevElement.classList.remove('accordian--active')
        }

        currElement.classList.toggle('accordian--active');
        setPrevElement(currElement);
    }


    return (
        <header className='index'>            
            <div>
                <div className='nav-info'>
                    <div className="mobile-menu">
                        <div data-menu-button onClick={() => {dispatch(Menu())}}>
                            <ion-icon name="menu-outline"></ion-icon>
                        </div>

                        <section data-menu={menuState? "active": ""}>
                            <div>
                                <div className='accordian' onClick={showAccordian}>
                                    <ul>
                                        <li>VISIT</li>
                                        <li><ion-icon name='chevron-up-outline'></ion-icon></li>
                                    </ul>
                                    <div className='accordian-body'>
                                        <div>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1965.1700446014268!2d8.88234653822753!3d9.905606997548775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNTQnMjAuMiJOIDjCsDUzJzAxLjEiRQ!5e0!3m2!1sen!2sng!4v1711917978711!5m2!1sen!2sng" style={{width:'100%', height: 300, border: 0}}></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div className='accordian' onClick={showAccordian}>
                                    <ul>
                                        <li>SHIPPING</li>
                                        <li><ion-icon name='chevron-up-outline'></ion-icon></li>
                                    </ul>
                                    <div className='accordian-body'>
                                        <ShippingNav />
                                    </div>
                                </div>
                                <div>
                                    <div><ion-icon name="person"></ion-icon></div>
                                    <div>
                                        <svg viewBox="0 0 247 63">
                                            <path d="M16.9012 8.22445L16.9038 8.21772L16.9064 8.21095C18.4849 3.99842 22.5504 1 27.3098 1H219.51C224.269 1 228.335 3.99842 229.913 8.21095L229.916 8.21771L229.919 8.22443C230.08 8.6379 230.364 9.00663 230.773 9.26037L230.784 9.26644C231.209 9.52284 231.632 9.77538 232.052 10.026C235.484 12.0751 238.7 13.9951 241.187 16.8374C243.926 19.9661 245.82 24.2766 245.82
                                                31.26C245.82 38.2435 243.926 42.5539 241.187 45.6827C238.7 48.525 235.484 50.445 232.051 52.4942C231.634 52.7431 231.214 52.994 230.792 53.2486C230.347 53.5072 230.07 53.9085 229.919 54.2956L229.916 54.3024L229.913 54.3091C228.335 58.5217 224.269 61.52 219.51 61.52H27.3098C22.5504 61.52 18.4849 58.5217 16.9064 54.3091L16.9038 54.3024L16.9012 54.2956C16.7394 53.8822
                                                16.4562 53.5135 16.0464 53.2598L16.0464 53.2597L16.0355 53.2531C15.6152 53.0003 15.1972 52.7513 14.7824 52.504C11.3448 50.4558 8.12348 48.5362 5.6325 45.6902C2.89424 42.5616 1 38.2487 1 31.26C1 24.2766 2.8941 19.9661 5.6325 16.8374C8.12018 13.9951 11.3361 12.0751 14.7683 10.026C15.1854 9.77696 15.6056 9.52605 16.0282 9.27136C16.4732 9.01276 16.7498 8.61149 16.9012 8.22445Z"></path>
                                        </svg>
                                        <div>
                                            <span>LOGIN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                     <div className="desktop-menu">
                        <div>
                            <div>Visit us</div>
                            <div>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                            <div className='dropdown'>
                                <div className='map-wrapper'>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1965.1700446014268!2d8.88234653822753!3d9.905606997548775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwNTQnMjAuMiJOIDjCsDUzJzAxLjEiRQ!5e0!3m2!1sen!2sng!4v1711917978711!5m2!1sen!2sng" style={{width:'100%', height: 380, border: 0}}></iframe>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Shipping</div>
                            <div>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                            <div className='dropdown'>
                                <ShippingNav />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='logo'>
                    <div href="" onClick={handleClick}>
                        <img src={isMobile? "/images/mobile-view-logo.jpg"
                            : "/images/logo.png"} alt="logo of Nenee's delicacy" />
                    </div>
                </div>  

                <div className='user-info'>
                    <div>
                        <ion-icon name="person"></ion-icon>
                    </div>

                    <div onClick={() => {dispatch(Blur());}} ref={cartIcon}>
                        <ion-icon name="bag"></ion-icon>
                        <div className='cart-number'>{
                        data?.cartitems.length===0? "": data?.cartitems.length
                        }</div>
                    </div>
                </div>
            </div>
            <Suspense><Cart data={data}/></Suspense>
        </header>
     );
}

export default Navbar;