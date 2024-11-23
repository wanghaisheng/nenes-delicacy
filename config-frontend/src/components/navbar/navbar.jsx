import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useQuery } from '@tanstack/react-query';
import { get, getCookie } from '../../utils';
import CartPreloader from '../cart/cartPreloader';
import { useMediaQuery } from 'react-responsive'
import { lazy, Suspense, useState, useRef} from 'react';
import { Blur, Menu } from '../../actions';
import './navbar.scss';


const Cart= lazy(() => import("../cart/cart"));

const Navbar = () => {
                          
    const cartIcon = useRef()
    const inputRef = useRef()
    const mobileInputRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 2000)
    const [prevElement, setPrevElement] = useState()
    const menuState = useSelector(state => state.getMenu)
    const isMobile = useMediaQuery({query: '(max-width: 912px)'});


    const getCart = useQuery({
        queryKey: ['carts'],
        queryFn: () =>  get(`cart/getCart/?sessionid=${getCookie()}`), 
        staleTime: Infinity,
        retry: 1
    }, ) 


    const { data, isLoading, isError } = useQuery({
        queryKey: ['search', debouncedValue],
        queryFn: () => get(`products/search/?query=${debouncedValue}`), 
        staleTime: Infinity,
        enabled: debouncedValue != '',
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        inputRef.current.value = ''
        mobileInputRef.current.value = ''
        setSearchValue('')
        dispatch(Menu())
        navigate(`search?query=${searchValue}`)
    }


    const shippingInfo = () => {
        return (
            <div className='shipping-info'>
                <span className='shipping-title'>Shipping Information</span>
                <p> We do not dispatch products today or within the next two days,
                    to ensure that we consistently deliver fresh items to our customers.
                </p>
            </div>
    )}


    const showAccordian = (e) => {
        const currElement = e.currentTarget;

        if (prevElement && prevElement !== currElement) {
            prevElement.classList.remove('accordian--active')
        }

        currElement.classList.toggle('accordian--active');
        setPrevElement(currElement)
    }

    
    const mobileMenu = () => {
        return (
        <div className="mobile-menu">
            <div data-menu-button onClick={() => {dispatch(Menu())}}>
                <ion-icon name="menu-outline"></ion-icon>
            </div>

            <section data-menu={menuState? "active": ""}>
                <div>
                    <div className='search-dropdown'>
                        <div className='input-wrapper'>
                            <div>
                                <ion-icon name="search"></ion-icon>
                            </div>
                            <form action="" onSubmit={handleSubmit}>
                                <input 
                                    ref={mobileInputRef}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    type="text" 
                                    name="" 
                                    id="" 
                                    placeholder='SEARCH OUR STORE'/>
                            </form>
                        </div>
                    </div>
                    
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
                            {shippingInfo()}
                        </div>
                    </div>

                    <div className="accordian" onClick={showAccordian}>
                        <ul>
                            <li>GROCERY</li>
                            <li><ion-icon name='chevron-up-outline'></ion-icon></li>
                        </ul>
                        <div className='accordian-body'>
                            <div>
                                <Link to={'products'}>
                                    <span>VIEW ALL GROCERY PRODUCTS</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div><ion-icon name="person"></ion-icon></div>
                        <div className='icon-wrapper'>
                            <svg className="icon" viewBox="0 0 247 63">
                                <path d="M16.9012 8.22445L16.9038 8.21772L16.9064 8.21095C18.4849 3.99842 22.5504 1 27.3098 1H219.51C224.269 1 228.335 3.99842 229.913 8.21095L229.916 8.21771L229.919 8.22443C230.08 8.6379 230.364 9.00663 230.773 9.26037L230.784 9.26644C231.209 9.52284 231.632 9.77538 232.052 10.026C235.484 12.0751 238.7 13.9951 241.187 16.8374C243.926 19.9661 245.82 24.2766 245.82
                                    31.26C245.82 38.2435 243.926 42.5539 241.187 45.6827C238.7 48.525 235.484 50.445 232.051 52.4942C231.634 52.7431 231.214 52.994 230.792 53.2486C230.347 53.5072 230.07 53.9085 229.919 54.2956L229.916 54.3024L229.913 54.3091C228.335 58.5217 224.269 61.52 219.51 61.52H27.3098C22.5504 61.52 18.4849 58.5217 16.9064 54.3091L16.9038 54.3024L16.9012 54.2956C16.7394 53.8822
                                    16.4562 53.5135 16.0464 53.2598L16.0464 53.2597L16.0355 53.2531C15.6152 53.0003 15.1972 52.7513 14.7824 52.504C11.3448 50.4558 8.12348 48.5362 5.6325 45.6902C2.89424 42.5616 1 38.2487 1 31.26C1 24.2766 2.8941 19.9661 5.6325 16.8374C8.12018 13.9951 11.3361 12.0751 14.7683 10.026C15.1854 9.77696 15.6056 9.52605 16.0282 9.27136C16.4732 9.01276 16.7498 8.61149 16.9012 8.22445Z">
                                </path>
                            </svg>

                            <div>
                                <span>BLOG</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }


    return (
        <header>
            <div>
                <div className='nav-info'>
                    {mobileMenu()}
                     <div className="desktop-menu">
                        <div>
                            <div>VISIT US</div>
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
                            <div>SHIPPING</div>
                            <div>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                            <div className='dropdown'>
                                {shippingInfo()}
                            </div>
                        </div>

                        <div>
                            <div>GROCERY</div>
                            <div>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                            <div className='dropdown'>
                                <div className='grocery-desktop'>
                                    <Link to={'products'}>
                                        <span>View all grocery products</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

                <div className='logo'>
                    <Link to={''}>
                        <img src={`https://res.cloudinary.com/dqdtnitie/image/upload/${isMobile? 'v1731314786/nene_s_delicacy_logo_black_rnle2z.png': 'v1727499524/Nene_s_Delicacy-1_zje8yw.png'}`} 
                            alt="logo of Nenee's delicacy"/>
                    </Link>
                </div>  

                <div className='user-info'>
                    <div  className='icon-wrapper'>
                        <svg className="icon" viewBox="0 0 247 63">
                            <path d="M16.9012 8.22445L16.9038 8.21772L16.9064 8.21095C18.4849 3.99842 22.5504 1 27.3098 1H219.51C224.269 1 228.335 3.99842 229.913 8.21095L229.916 8.21771L229.919 8.22443C230.08 8.6379 230.364 9.00663 230.773 9.26037L230.784 9.26644C231.209 9.52284 231.632 9.77538 232.052 10.026C235.484 12.0751 238.7 13.9951 241.187 16.8374C243.926 19.9661 245.82 24.2766 245.82
                                31.26C245.82 38.2435 243.926 42.5539 241.187 45.6827C238.7 48.525 235.484 50.445 232.051 52.4942C231.634 52.7431 231.214 52.994 230.792 53.2486C230.347 53.5072 230.07 53.9085 229.919 54.2956L229.916 54.3024L229.913 54.3091C228.335 58.5217 224.269 61.52 219.51 61.52H27.3098C22.5504 61.52 18.4849 58.5217 16.9064 54.3091L16.9038 54.3024L16.9012 54.2956C16.7394 53.8822
                                16.4562 53.5135 16.0464 53.2598L16.0464 53.2597L16.0355 53.2531C15.6152 53.0003 15.1972 52.7513 14.7824 52.504C11.3448 50.4558 8.12348 48.5362 5.6325 45.6902C2.89424 42.5616 1 38.2487 1 31.26C1 24.2766 2.8941 19.9661 5.6325 16.8374C8.12018 13.9951 11.3361 12.0751 14.7683 10.026C15.1854 9.77696 15.6056 9.52605 16.0282 9.27136C16.4732 9.01276 16.7498 8.61149 16.9012 8.22445Z"></path>
                        </svg>
                    <div>
                            <span>
                                BLOG
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className='user-icon'>
                            <ion-icon onClick={() => {dispatch(Menu())}} name="search"></ion-icon>
                        </div>

                        <div className={`search-dropdown ${menuState? 'search-dropdown-show':'search-dropdown-hide'}`}>
                            <div>
                                <div>
                                    <ion-icon name="search"></ion-icon>
                                </div>

                                <div className='input-wrapper'>
                                    <form onSubmit={handleSubmit}>
                                        <input
                                            ref={inputRef}
                                            onChange={(e) => setSearchValue(e.target.value)} 
                                            type="text" name="" id="" placeholder='SEARCH OUR STORE'/>
                                    </form>
                                </div>
                            </div>

                            {isError? 
                                <div className='results-error'>
                                    <span>Error!</span> Could not fetch results for
                                    <span> '{searchValue}'</span> <br/>
                                    please try again
                                </div> : null }

                            {isLoading? 
                                <div className='pre-loader'>
                                    <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1721250342/spinner-trans-bg_r89iew.gif" alt="loader" />
                                </div> : null
                            }

                            {data && data.results.length != 0?
                                <div className='search-results'>
                                    <div>
                                        <p>
                                            Search results for: <br/> <span>'{debouncedValue}'</span>
                                        </p>
                                    </div>
            
                                    <div className='search-items'>
                                        {data.results.slice(0,5).map(query => (
                                            <Link key={query.id} onClick={() => dispatch(Menu())} 
                                                    to={`${query.product_type.parameter}/${query.name}`}>
                                                    <div className='result-item'>
                                                        <div>
                                                            <LazyLoadImage
                                                                src={import.meta.env.VITE_CLOUD_URL + query.image}
                                                                effect='blur'
                                                                alt={query.name}
                                                                placeholderSrc={import.meta.env.VITE_CLOUD_URL + query.lazyImage}
                                                            />
                                                        </div>

                                                        <div>
                                                            <p>{query.name}</p>
                                                            <div className='query-price'>
                                                                <div>
                                                                <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1727523518/naira_aon4oj.svg" alt="" />
                                                                </div>
                                                                {Intl.NumberFormat("en-US").format(query.unit_price)}
                                                            </div>
                                                        </div>
                                                    </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div> : null
                            }

                            {data && data.results.length === 0?
                                <center className='no-results'>
                                    <p>No results found for '<span>{debouncedValue}</span>' </p>
                                </center> : null
                            }
                        </div>
                    </div>

                    <div>
                        <div className='user-icon'>
                            <ion-icon name="person"></ion-icon>
                        </div>
                    </div>

                    <div onClick={() => {dispatch(Blur())}} ref={cartIcon}>
                        <div className='user-icon'>
                            <ion-icon name="bag"></ion-icon>
                            <div className='cart-number'>{
                                    getCart.data?.cartitems.length===0? "": getCart.data?.cartitems.length
                                }</div>
                        </div>
                    </div>
                </div>
            </div>

            <Suspense fallback={<CartPreloader/>}>
                <Cart getCart={getCart}/>
            </Suspense>
        </header>
      );
}

export default Navbar;