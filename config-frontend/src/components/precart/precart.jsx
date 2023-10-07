import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef} from "react";
import { routeProtection  } from "../../utils";
import { useQueryClient } from 'react-query'
import { useMediaQuery } from 'react-responsive'
import { useSelector } from "react-redux";
import Cookie from 'universal-cookie';     
import route from '/icons/route.svg'
import { v4 as uuid4 } from "uuid";
import gsap from 'gsap'
import './precart.scss'


 const cookie = new Cookie()

const Precart = () => {
    const cursor = useRef()
    const precart = useRef(null)
    const hidden = useSelector((state) => state.getOrderDetails)
    const queryClient = useQueryClient()
    const cart = queryClient.getQueryData(['carts'])
    const [carts, setCart] = useState(cart)
    const [ height, setHeight] = useState(0)
    const [protection, setProtection] = useState(cookie.get('route-protection'))

    const isMobile = useMediaQuery({query: '(max-width: 920px)'})



    const handleChange = () => {

        cursor.current.style.cursor = 'wait'

        setTimeout(() => {
            if (!carts.includes(routeProtection)) {

                cookie.set('route-protection', uuid4())
                setCart([routeProtection, ...carts])
            } else {

                cookie.remove('route-protection', {path: '/'})
                setCart(carts.filter(item => item !== routeProtection)) 
            }

            setProtection(cookie.get('route-protection')) 
            cursor.current.style.cursor = 'pointer'

        }, 700)  
    }


    useEffect(() => {

        const eleHeight = precart.current.scrollHeight
        const timeInms = {duration: .5}
    
        if (protection || eleHeight) {  
            setCart([routeProtection, ...cart])

            if (eleHeight !== 0) {
                setHeight(eleHeight)
            }
        }


        if (isMobile) {
            
            hidden ?
            gsap.to(precart.current, 
             {height: `${height}px`, display: 'block', ...timeInms}) 
            : 
            
            gsap.to(precart.current, 
             {height: 0, display: 'none', ...timeInms})


        } else {
        
                precart.current.style.height = `${height}px`;
                precart.current.style.display = 'block'
        }


    }, [height, hidden, isMobile])


    const total = carts.reduce(
        (acc, cart) => acc + Number(cart.item.unit_price * cart.quantity), 0
    )


    return ( 
        <section className="precart">
            <div>
                <div ref={precart} className={"precart-wrapper"}>
                <div className="precart-outer">
                    {carts.map(cart => (
                        <div key={cart.id}>
                            <div className="precart-image">
                                <div>{cart.quantity}</div>
                                <img src={cart.item.image} alt="" />
                            </div>
                            <div className="precart-info">
                                <h1>{cart.item.name}</h1>
                                <span>{cart.item.description}</span>
                            </div>
                            <div className="precart-price">
                                <span><FontAwesomeIcon icon="fa-solid fa-naira-sign" /></span>
                                <span>{Intl.NumberFormat("en-US").format(cart.item.unit_price * cart.quantity)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pricing">
                    <div>
                        <h1>Subtotal</h1>
                        <p>
                            <FontAwesomeIcon icon="fa-solid fa-naira-sign" />
                            {Intl.NumberFormat("en-US").format(total)}
                        </p>
                    </div>
                    <div>
                        <h1>Shipping</h1>
                        <p className="shipping-info">Calculated at next step</p>
                    </div>
                    <div className="total">
                        <span>Total</span>
                        <p>
                            <FontAwesomeIcon icon={faNairaSign} />
                            {Intl.NumberFormat("en-US").format(total)}
                        </p>
                    </div>
                </div>
                </div>

                <div className="route-protection-wrapper">
                    <div>
                        <div className="route-protection">
                            <img src={route} alt="" />
                            <span>Package Protection</span>
                            <p>Against loss, theft or damage in transit and instant resolution</p>
                        </div>

                        <div ref={cursor} className={protection? "toggle":"deselect"} onClick={(el) => {handleChange(el); }}>
                            <div>
                                <div className="thumb"></div>
                            </div>
                        </div>
                    </div>
                    <p>By deselecting ROUTE package protection, customer acknowledges that Nene's delicacy will not be held liable for lost, broken or damaged proteties.</p>
                </div>
            </div>
        </section>
     );
}

export default Precart;