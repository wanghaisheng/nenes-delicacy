import './cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  useDispatch, useSelector } from 'react-redux'
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import CartPreloader from './cartPreloader';
import { Error } from '../preloader/preloader';
import { Blur } from '../../actions';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useMutation,  useQueryClient} from 'react-query'
import axios from '../../axios';


const Cart = ({ getCart }) => {
    
    const dispatch = useDispatch()
    const queryclient = useQueryClient()
    const carts = queryclient.getQueryData(['carts'])
    const state = useSelector(state => state.getBlurred)
    const cartEmpty = carts?.length === 0


    const cartCalucation = (x, y, operand) => {
        if (operand === "+") {
            return x + y
        } else return x - y
    }

    
    const deleteCartItem = useMutation({
        mutationFn: async (cartitem) => {
            const prevCart = carts
            axios.delete(`cart/deleteCartItem/?itemId=${cartitem.id}`)
            carts.cartitems.splice(carts.cartitems.indexOf(cartitem), 1)
            carts.total = carts.total - cartitem.price
            return { prevCart }
             
        }, onSuccess: () => {
            queryclient.setQueryData(['carts'], carts)

        }, onError: (err, newCart, context) => {
            queryclient.setQueryData(['carts'], context.prevCart )
        }
    })


    const updateCartItem = useMutation({

        mutationFn: async (data) => {
            const prevCart = carts
            axios.put(`cart/updateCartItem/`, data)
            carts.cartitems[data.index].quantity = data.quantity

            carts.total = cartCalucation(Number(carts.total), data.unit_price, data.operand)
            carts.cartitems[data.index].price = cartCalucation(data.price, data.unit_price, data.operand)
            
            return { prevCart }

        }, onSuccess: () => {
            queryclient.setQueryData(['carts'], carts)

        }, onError: (err, newCart, context) => {
            queryclient.setQueryData(['carts'], context.prevCart )
        }
    })

    
    const handleSubmit = (e) => {  
        document.body.classList.toggle('noscroll')

        if (carts.length === 0) {
            e.preventDefault()
        }
    }


    const handleJSX = () => {
        if (getCart.isLoading) {
            return (
                <CartPreloader/>
            )
        }
        
        if (getCart.isError) {
            return (
                <Error 
                message='An error occured while fetching cart'
                refetch={getCart.refetch}
                />
            )
        }

        return ( 
            <>
                <div className="checkout">
                <Link to={cartEmpty? '': 'checkout'} onClick={() => {dispatch(Blur())}}>
                    <div onClick={handleSubmit}>
                        <svg viewBox="0 0 247 63" ><path d="M16.9012 8.22445L16.9038 8.21772L16.9064 8.21095C18.4849 3.99842 22.5504 1 27.3098 1H219.51C224.269 1 228.335 3.99842 229.913 8.21095L229.916 8.21771L229.919 8.22443C230.08 8.6379 230.364 9.00663 230.773 9.26037L230.784 9.26644C231.209 9.52284 231.632 9.77538 232.052 10.026C235.484 12.0751 238.7 13.9951 241.187 16.8374C243.926 19.9661 245.82 24.2766 245.82 31.26C245.82 38.2435 243.926 42.5539 241.187 45.6827C238.7 48.525 235.484 50.445 232.051 52.4942C231.634 52.7431 231.214 52.994 230.792 53.2486C230.347 53.5072 230.07 53.9085 229.919 54.2956L229.916 54.3024L229.913 54.3091C228.335 58.5217 224.269 61.52 219.51 61.52H27.3098C22.5504 61.52 18.4849 58.5217 16.9064 54.3091L16.9038 54.3024L16.9012 54.2956C16.7394 53.8822 16.4562 53.5135 16.0464 53.2598L16.0464 53.2597L16.0355 53.2531C15.6152 53.0003 15.1972 52.7513 14.7824 52.504C11.3448 50.4558 8.12348 48.5362 5.6325 45.6902C2.89424 42.5616 1 38.2487 1 31.26C1 24.2766 2.8941 19.9661 5.6325 16.8374C8.12018 13.9951 11.3361 12.0751 14.7683 10.026C15.1854 9.77696 15.6056 9.52605 16.0282 9.27136C16.4732 9.01276 16.7498 8.61149 16.9012 8.22445Z"></path></svg>
                        {cartEmpty?
                            <div>
                                <span>Continue Shopping</span>
                            </div>
                                :
                            <div>
                                <span className='naira-sign'>
                                    <FontAwesomeIcon icon={faNairaSign} />
                                    {Intl.NumberFormat("en-US").format(carts?.total)}
                                </span>
                                <span></span>
                                <span> CHECKOUT </span>
                            </div>}
                    </div>
                </Link>
                <div>Shipping cost calculated at checkout</div>
                </div>
                <div className="cartitems">
                {carts?.cartitems.map(((cartitem, index) => (
                    <div key={cartitem.id} className='cartitem'>
                        <div>
                            <div className='cart-image'>
                                <LazyLoadImage
                                    src={import.meta.env.VITE_CLOUD_URL + cartitem.item.image}
                                    effect='blur'
                                    alt={cartitem.item.name}
                                    placeholderSrc={import.meta.env.VITE_CLOUD_URL + cartitem.item.Lazyimage}
                                />
                            </div>
                
                            <div>
                                <span>{cartitem.item.name}</span>
                                <div>
                                    <span className='naira-sign'><FontAwesomeIcon icon={faNairaSign} /></span>
                                    {Intl.NumberFormat("en-US").format(cartitem.price)}
                                </div>
                                <div className='quantity'>
                                    <button onClick={() => {setTimeout(() => {updateCartItem.mutate({
                                        index,
                                        item: cartitem.id,
                                        quantity: cartitem.quantity + 1,
                                        unit_price: Number(cartitem.item.unit_price),
                                        price: Number(cartitem.price),
                                        operand: '+',
                                    })}, 2000)}
                                        }>
                                        <ion-icon name="add-circle"/>
                                    </button>
                                    <span>{cartitem.quantity}</span>
                                    <button disabled={cartitem.quantity <= 1? true : false}
                                            onClick={() => {setTimeout(() => {updateCartItem.mutate({
                                                index,
                                                item: cartitem.id,
                                                unit_price: Number(cartitem.item.unit_price),
                                                price: Number(cartitem.price),
                                                quantity: cartitem.quantity - 1,
                                                operand: '-'
                                                })}, 2000)}
                                        }>
                                        <ion-icon name="remove-circle"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => {setTimeout(() => {
                            deleteCartItem.mutate(cartitem)
                            }, 2000)}
                            }>
                            <span>REMOVE</span>
                        </div>
                    </div>
                )))}
                </div>
            </>
        )
    }

    return ( 
        <section className={state? "open-cart": "cart"}>
            {handleJSX()}             
        </section>
     );
}

export default Cart;