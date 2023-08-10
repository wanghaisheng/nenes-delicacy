import Cart from '../cart/cart';
import { useDispatch } from 'react-redux'
import { Blur } from '../../actions';
import './navbar.scss';

const Navbar = () => {
                          
    const dispatch = useDispatch()

    const noScroll = () => document.body.classList.toggle('noscroll')
    
    
    return ( 
        <header className='navbar'>
            <div>
                <a href="/">
                    <p>Nene's delicacy</p>
                </a>
                <div>
                    <div className="user">
                        <ion-icon size="small" name="chevron-down-sharp"></ion-icon>
                        <ion-icon name="person"></ion-icon>

                        <div className="dropdown">
                                <ul>
                                    <li>My orders</li>
                                <   li>Sign out</li>
                                </ul>
                        </div>
                    </div>
                    
                    <div onClick={() => {dispatch(Blur()); noScroll()}}>
                        <ion-icon name="bag"></ion-icon>
                        <div className='cart-number'></div>
                    </div>
                </div>
            </div>
            <Cart />
        </header>
     );
}

export default Navbar;