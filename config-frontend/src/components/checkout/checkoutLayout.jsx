import { Outlet } from 'react-router-dom';
import { lazy, Suspense  } from 'react';
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
import './layouts.scss'

const Precart = lazy(() => import('../precart/precart'))


function CheckoutLayout() {

    const mobile = useMediaQuery({query: '(max-width: 767px)'});
    const navigation = useRef()
    const location = useLocation()

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

        navigation.current?.childNodes.forEach(node => { 
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
        <section className="checkout-layout">
            <Suspense fallback={<div>Loading...</div>}>
                <div className='layout-wrapper'>
                    <header>
                    <div className="mobile-logo">
                        <a href="/">
                            <img src='/images/mobile-view-logo.jpg'/>
                        </a>
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
                    <Outlet/>
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
                <Precart/>  
                {mobile? 
                    <div>
                        <div className="mobile-logo">
                            <a href="/">
                                <img src='/images/mobile-view-logo.jpg'/>
                            </a>
                        </div>
                    </div> : null
                    }
            </Suspense>
        </section>
     );
}

export default CheckoutLayout;