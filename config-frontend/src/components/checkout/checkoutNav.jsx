import { Outlet } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import { useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import './layoutFooter.scss'
import './layouts.scss'


const LayoutFooter = () => {
    return (
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
    )
}


function CheckoutNav() {

    const navigation = useRef()
    const location = useLocation()
    const preview = JSON.parse(window.sessionStorage.getItem('shipping'))
    const navigate = useNavigate()
    
 
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


    useEffect(() => {

        // if (!preview && (location.pathname !== '/checkout')) {
        //     navigate('checkout')
        // }

        navigation.current.childNodes.forEach(node => { 
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

    }, [location])

      
    return ( 
        <div>
            <header>
            <div className="mobile-logo">
                <img src='/images/mobile-view-logo.jpg'/>
            </div>
                <div className="navigation">
                    <ul ref={navigation}>
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
            
            <Outlet />
            <LayoutFooter />
        </div >
     );
}

export { CheckoutNav, LayoutFooter};