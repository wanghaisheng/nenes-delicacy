import './cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, getCookie } from '../../utils';
import { useSelector } from 'react-redux'
import { useQuery, useMutation } from 'react-query'
import { useRef } from 'react';


const Cart = () => {
    
    const cart = useRef()
    const state = useSelector(state => state.getBlurred)

    const getCart = useQuery({
        queryKey: ['carts'],
        queryFn: () =>  get(`cart?sessionid=${getCookie()}`)
    })

 console.log(getCart)

 if (getCart.isLoading) {
    return <div>Loading...</div>
 }

 if (getCart.isError) {
    return <pre>Something happened {JSON.stringify(getCart.error)}</pre>
 }


    return ( 
        <section ref={cart} className={state? "open-cart": "cart"}>
            <header>Cart</header>
                <div className="cartitems">
                    
                    {getCart.data.map((cartitem => (
                        <div key={cartitem.id}>
                            <div className='cart-image'>
                                <img src={cartitem.item.image} alt={cartitem.item.name} />
                            </div>
                            <div>
                                <span>{cartitem.item.name}</span>
                                <div>
                                    <span><FontAwesomeIcon icon="fa-solid fa-naira-sign" /></span>
                                    {Intl.NumberFormat("en-US").format(cartitem.item.unit_price * cartitem.quantity)}
                                </div>
                                <div>
                                    <ion-icon name="add-circle"/>
                                    <span>{cartitem.quantity}</span>
                                    <ion-icon name="remove-circle"/>
                                </div>
                            </div>
                            <div><ion-icon name="close"/></div>
                        </div>
                    )))}
                </div>
        </section>
     );
}

export default Cart;