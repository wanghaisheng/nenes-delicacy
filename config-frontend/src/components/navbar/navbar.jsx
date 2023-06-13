import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.scss'

const Navbar = () => {

    const nav = useRef()
    const [top, setTop] = useState(false)
    const location = useLocation()
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY !== 0) {
                setTop(true)

            } else setTop(false)
        })

        if (location.pathname !== '/') {
            nav.current.style.position = 'sticky'
        }
    }, [top])

    return ( 
        <header ref={nav} className={top? 'onScroll': 'navbar'}>
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
                                <li>Sign out</li>
                            </ul>
                    </div>
                </div>

                <ion-icon name="bag"></ion-icon>
            </div>
        </header>
     );
}

export default Navbar;