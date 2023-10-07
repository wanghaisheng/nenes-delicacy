import './item.scss';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { get, post, getCookie } from '../../utils';
import { useEffect, useState } from 'react';

const session = getCookie();


const Item = () => {

    const param = useParams()
    const [item, setItem] = useState({product_type: ""})
    const [count, setCount] = useState(1)
    const queryclient = useQueryClient()

   
    useEffect(() => {

        get('products').then(res => {
            const result = res.find(ele => ele.name === param.name)
            setItem(result)
            console.log(item)
        })
    }, [])


    const newCartItem = useMutation({

        mutationFn: async (data) => {
            const postItem = await post('cart/addToCart/', data)
            return postItem
    
        }, onSuccess: (res) => {
            res.data.item.image = 'http://127.0.0.1:8000/' + res.data.item.image
            queryclient.setQueryData(['carts'], (old) => {
                old = old.filter(item => item.id != res.data.id)
                const carts = [...old, res.data]
                return carts
            })
        }
    })

    return (
        <section className='item'>
            <div>
                <a href="/">Home</a>
                <div><ion-icon name="chevron-forward"></ion-icon></div>
                <a href={`/${item.product_type.parameter}`}>
                    {item.product_type.product_name}
                </a>
                <div><ion-icon name="chevron-forward"></ion-icon></div>
                <a href="" onClick={(e) => e.preventDefault()}>{item.name}</a>
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
                        <span><FontAwesomeIcon icon={faNairaSign} /></span>
                        {Intl.NumberFormat("en-US").format(item.unit_price * count)}
                    </div>

                    <p>{item.description}</p>

                    <div className="add-to-cart">
                        <div>
                            <button onClick={() => setCount(count + 1)}>
                                <ion-icon name="add-circle"/>
                            </button>

                            <span>{count}</span>
                            
                            <button disabled={count < 2? true: false} 
                                    onClick={() => setCount(count - 1)}>
                                        
                                <ion-icon name="remove-circle"/>
                            </button>
                        </div>

                        <div>
                            <button onClick={() => newCartItem.mutate({
                                'sessionid': session,
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