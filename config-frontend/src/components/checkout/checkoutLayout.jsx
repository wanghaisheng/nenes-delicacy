import Precart from "../precart/precart";
import { Outlet } from 'react-router-dom';
import { Details } from "../../actions";
import  Cookie  from "universal-cookie";
import { useDispatch } from "react-redux";
import { useQueryClient } from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import './layouts.scss'


const cookie = new Cookie()

function CheckoutLayout() {

    const dispatch = useDispatch()
    const mobile = useMediaQuery({query: '(max-width: 767px)'})
    const queryClient = useQueryClient()
    const carts = queryClient.getQueryData(['carts'])
    const [route, setRoute] = useState(cookie.get('route-protection'))


    let total = carts.reduce(
        (acc, cart) => acc + Number(cart.item.unit_price * cart.quantity), 0
    )

    useEffect(() => {
        if (route) {
            total = total + 1000
        }
    }, [route])

    


    return ( 
        <section className="layout-wrap">
            <Outlet /> 
            <Precart />
            {mobile? 
                <div>
                    <div className="mobile-logo">
                        <img src='/images/mobile-view-logo.jpg'/>
                    </div>

                    <div className="order-summary">
                        <div onClick={() => {dispatch(Details())}}>
                            <div>Show order summary</div>
                            <div><ion-icon name="chevron-down-outline"></ion-icon></div>
                        </div>

                        <div>
                            <span><FontAwesomeIcon icon={faNairaSign} /></span>
                            <span>{Intl.NumberFormat("en-US").format(total)}</span>
                        </div>
                    </div>
                </div>
                : ''
            }
        </section>
     );
}

export default CheckoutLayout;