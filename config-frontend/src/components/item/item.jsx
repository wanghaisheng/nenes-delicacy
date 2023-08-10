import './item.scss';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get, post, getCookie } from '../../utils';
import { useEffect, useState } from 'react';


const Item = () => {

    const param = useParams()
    const [item, setItem] = useState([])
    const [count, setCount] = useState(1)

   
    useEffect(() => {

        get('products').then(res => {
            const result = res.find(ele => ele.name === param.name)
            setItem(result)
        })

        getCookie()
        
    }, [])


    // useEffect(() => {

    //     getproducts().then(res => {
    //         const data = res.find(element => element.id === item.product_type)
    //         setProduct(data)
    //         console.log(data)
    //     })

    // }, [item])


    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count === 1) return

        setCount(count - 1)
    }

    return (
        <section className='item'>
            <div>
                <a href="/">Home</a>
                <ion-icon name="chevron-forward"></ion-icon>
                {/* <a href={product.parameter}>{product.product_name}</a>
                <ion-icon name="chevron-forward"></ion-icon> */}
                <a href="">{item.name}</a>
            </div>
            <div>
                <div>
                    <div className="image">
                        <img src={item.image} alt={item.name} />
                    </div>
                </div>

                <div className='item-info'>
                    <p>{item.name}</p>
                    <div>
                        <span><FontAwesomeIcon icon="fa-solid fa-naira-sign" /></span>
                        {Intl.NumberFormat("en-US").format(item.unit_price * count)}
                    </div>

                    <p>{item.description}</p>

                    <div className="add-to-cart">
                        <div>
                            <ion-icon name="add-circle" onClick={() => increment()} />
                            <span>{count}</span>
                            <ion-icon name="remove-circle" onClick={() => decrement()} />
                        </div>

                        <div>
                            <button onClick={() => post('cart/addCart/', {
                                'sessionid': sessionid,
                                'item': item.id,
                                'quantity': count
                            })}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Item;