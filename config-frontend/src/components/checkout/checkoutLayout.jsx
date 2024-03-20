import { Outlet } from 'react-router-dom';
import Precart from '../precart/precart'
import { useMediaQuery } from 'react-responsive'
import './layouts.scss'



function CheckoutLayout() {

    const mobile = useMediaQuery({query: '(max-width: 767px)'});

    return ( 
        <section className="layout-wrap checkout-layout">
            <Outlet/> 
            <Precart/>
            {mobile? 
                <div>
                    <div className="mobile-logo">
                        <img src='/images/mobile-view-logo.jpg'/>
                    </div>
                </div>
                : ''
            }
        </section>
     );
}

export default CheckoutLayout;