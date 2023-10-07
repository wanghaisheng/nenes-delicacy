import Cart from '../cart/cart';
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { useQueryClient } from 'react-query'
import { Blur } from '../../actions';
import './navbar.scss';


const Navbar = () => {
                          
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const cart = queryClient.getQueryData(['carts'])

    const noScroll = () => document.body.classList.toggle('noscroll')
    const isMobile = useMediaQuery({query: '(max-width: 912px)'})


    return ( 
        <header className='navbar'>       
            <div>
                <div className='nav-info'>
                    {isMobile?
                    <div>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div> :
                    <>
                        <div>
                            <a href="">Visit us</a>
                            <div className='icon'>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                        </div>

                        <div>
                            <a href="">Shipping</a>
                            <div>
                                <ion-icon name='chevron-up-outline'></ion-icon>
                            </div>
                        </div>
                    </>
                    }    
                </div>

                <div className='logo'>
                    <a href="/">
                        <img src={isMobile? "/images/mobile-view-logo.jpg": "/images/logo.png"} alt="logo of nene's delicacy" />
                    </a>
                </div>  

                <div className='user-info'>
                    <div>
                        <ion-icon name="person"></ion-icon>
                    </div>

                    <div onClick={() => {dispatch(Blur()); noScroll()}}>
                        <ion-icon name="bag"></ion-icon>
                        <div className='cart-number'>{cart.length}</div>
                    </div>
                </div>
            </div>
            <Cart/>
        </header>
     );
}

export default Navbar;