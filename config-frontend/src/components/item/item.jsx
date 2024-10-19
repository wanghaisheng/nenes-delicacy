 import './item.scss';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import spinner from '/icons/pink-spinner.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Blur } from '../../actions';
import ItemPreloader from '../item/itemPreloader'
import { useMutation, useQueryClient } from 'react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { get, post, getCookie } from '../../utils';
import { Error } from '../preloader/preloader';
import { useState, useCallback, useRef, useEffect } from 'react';


const session = getCookie();

const Item = () => {

    const dispatch = useDispatch();
    const url = window.location.href
    const itemName = url.substring(url.lastIndexOf('/') + 1);
    const imageRef = useRef();
    const cartError = useRef();
    const [count, setCount] = useState(1);
    const queryclient = useQueryClient();


    const newCartItem = useMutation({

        mutationFn: async (data) => {
            const postItem = await post('cart/addToCart/', data)
            return postItem
    
        }, onSuccess: (res) => {
            queryclient.setQueryData(['carts'], (cart) => {
                const filtered_cart = cart.cartitems.filter(item => item.id != res.data.id)
                cart.cartitems = [res.data, ...filtered_cart]
                cart.total = Number(cart.total) + Number(res.data.price)
                return cart
            })
            dispatch(Blur())
        }, 
    })


    const { isError, 
            isLoading, 
            data, 
            refetch, 
            isSuccess
        } = useQuery({
        queryKey: ['products', itemName],
        queryFn: () => get(`products/get_item?name=${itemName}`)
    })


    // const variation = useQuery({
    //     queryKey: ['variation'],
    //     queryFn: () => get(`variation/get_variation?productID=${data.id}`),
    //     staleTime: 1
    // })



    useEffect(() => {
        window.scrollTo(0, 0)
    
        if (newCartItem.isError) {
            setTimeout(() => {
                cartError.current.style.display = 'none'
            }, 5000)
        }
    }, [newCartItem.isError])



    useEffect(() => {

        // if (!data) {
        //      navigate('/not-found')
        // }
    },[data])


    if (isLoading) {
        document.title = "Loading... | Nene's Delicacy";
        return <ItemPreloader/>
    }


    if (isError) {
        document.title = "Error | Nene's Delicacy";
        return <Error refetch={refetch} message="An error occurred"/> 
    }


    return (
        <>
        <section className='item'>
            <div>
                <a href="/">Home</a>
                <div><ion-icon name="chevron-forward"></ion-icon></div>
                <a href={`/products/${data.product_type.parameter}`}>
                    {data.product_type.name}
                </a>
                <div><ion-icon name="chevron-forward"></ion-icon></div>
                <a href="" onClick={(e) => e.preventDefault()}>{data.name}</a>
            </div>

            <div>
                <div>
                    <div className="image" ref={imageRef}>
                        <LazyLoadImage
                            src={import.meta.env.VITE_CLOUD_URL+data.image}
                            alt={data.name}
                            effect='blur'
                            width='100%'
                            height='100%'
                            placeholderSrc={import.meta.env.VITE_CLOUD_URL+data.lazyImage}
                        />
                    </div>
                </div>

                <div className='item-info'>
                    <p>{data.name}</p>
                    <div>
                        <span> 
                            <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1727523518/naira_aon4oj.svg" alt="" />
                        </span>
                        {Intl.NumberFormat("en-US").format(data.unit_price * count)}
                    </div>

                    <p>{data.description}</p>

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

                        <button onClick={() => new newCartItem.mutate({
                                'sessionid': session,
                                'item': data.id,
                                'quantity': count
                            })}>
                            <svg width="100%" height="100%" viewBox="0 0 242 63" className="Button__svg">
                                <path d="M233.592 60.2841L233.591 60.2856C233.153 60.9604 232.439 61.36 231.68 61.36H10.18C9.42073 61.36 8.70676 60.9604 8.26887 60.2856C6.7404 57.9293 4.6602 55.9868 2.22891 54.6277C1.46111 54.1958 1 53.4414 1 52.64V9.72C1 8.91859 1.46114 8.16415 2.22899 7.7323C4.6603 6.37309 6.74051 4.43059 8.26898 2.0742C8.70689 1.39952 9.4208 1 10.18 1H231.68C232.439 1 233.153 1.39958 233.591 2.07437C235.119 4.43039 237.199 6.37264 239.63 7.7318C240.399 8.16355 240.86 8.91826 240.86 9.72V52.64C240.86 53.4417 240.399 54.1965 239.63 54.6282C237.198 55.9882 235.119 57.9408 233.592 60.2841Z" strokeWidth="2"></path>
                            </svg>

                            <div>
                                {isLoading? 
                                    <div className='spinner'>
                                        <img src={spinner} alt="loading"/>
                                    </div> : null
                                }
                                
                                <span>ADD TO CART</span>
                            </div>

                            {newCartItem.isError? 
                            <div ref={cartError} className='add-to-cart__error'>
                                Sorry, there was an issue adding this item to the cart. Please try again.
                            </div> : null
                        }
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </>

    );
}

export default Item;