import { Outlet } from "react-router-dom"; 
import { useRef, useEffect, useState } from "react";
import './layouts.scss'


function CheckoutNav() {

    const navigation = useRef()

    const links = [
        {
            id: 0,
            title: 'Information',
            ref: 'pre-cart',
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

        navigation.current.childNodes.forEach(node => {
            if (node.firstChild.href === window.location.href) {
                node.classList.add('active')
                
                let nextElement = node.nextElementSibling;
                while (nextElement) {
                    nextElement.classList.add('disabled')
                    nextElement = nextElement.nextElementSibling
                }
            } else {
                node.classList.remove('active')
            }
        })

    }, [])

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
        </div >
     );
}

export default CheckoutNav;