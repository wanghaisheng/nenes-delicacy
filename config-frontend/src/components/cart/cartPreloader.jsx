import { useSelector } from "react-redux";
import './cart.scss'

const CartPreloader = () => {
    const cartState = useSelector(state => state.getBlurred)

    return (
        <section className={cartState? "open-cart": "cart"}>
            <div className='checkout checkout__preloader'>
                <div></div>
            </div>
            
            <div className='cartitems cartitems__preloader'>
                {[...Array(5)].map((x, index) => (
                    <div key={index}>
                        <div>
                        </div>

                        <div>
                            <ul>
                                {[...Array(4)].map((x, index) => (
                                    <li key={index}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CartPreloader;