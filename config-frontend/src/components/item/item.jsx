 import './item.scss';
import { useQuery } from '@tanstack/react-query';
import Lottie from 'react-lottie';
import { defaultOptions } from '../../utils';
import spinner from '../../lotties/item-spinner';
import { useDispatch } from 'react-redux';
import { Blur } from '../../actions';
import ItemPreloader from '../item/itemPreloader'
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { get, post, getCookie } from '../../utils';
import { Error } from '../preloader/preloader';
import { useState, useRef, useEffect } from 'react';


const session = getCookie();

const Item = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                return {
                    ...cart,
                    cartitems: [res.data, ...filtered_cart],
                    total:  Number(cart.total) + Number(res.data.price)
                }
            })
            dispatch(Blur())
        },
    })


    const { isError, 
            isLoading, 
            data, 
            refetch, 
            error
        } = useQuery({
        queryKey: ['products', itemName],
        queryFn: () => get(`products/get_item?name=${itemName}`)
    })


    useEffect(() => {
        if (error?.response?.data === 'Not found') {
            navigate('/not-found')
        }
    }, [error?.response?.data])

    // const variation = useQuery({
    //     queryKey: ['variation', data],
    //     queryFn: () => get(`variation/get_variation?productID=${data.id}`),
    // })


    useEffect(() => {
    
        if (newCartItem.isError) {
            setTimeout(() => {
                cartError.current.style.display = 'none'
            }, 5000)
        }
    }, [newCartItem.isError])



    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `${data? data.name : "Nene's Delicacy"}`;
    },[data])


    if (isLoading) {
        return <ItemPreloader/>
    }


    if (isError) {
        return <Error refetch={refetch} message="We’re having trouble getting the item"/> 
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
                            <img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1731311449/naira_k99wwn.png"} alt="" />
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

                        <button disabled={newCartItem.isLoading} onClick={() => newCartItem.mutate({
                                'sessionid': session,
                                'item': data.id,
                                'quantity': count
                            })}>
                                
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 242 63" className="Button__svg">
                                <path d="M233.592 60.2841L233.591 60.2856C233.153 60.9604 232.439 61.36 231.68 61.36H10.18C9.42073 61.36 8.70676 60.9604 8.26887 60.2856C6.7404 57.9293 4.6602 55.9868 2.22891 54.6277C1.46111 54.1958 1 53.4414 1 52.64V9.72C1 8.91859 1.46114 8.16415 2.22899 7.7323C4.6603 6.37309 6.74051 4.43059 8.26898 2.0742C8.70689 1.39952 9.4208 1 10.18 1H231.68C232.439 1 233.153 1.39958 233.591 2.07437C235.119 4.43039 237.199 6.37264 239.63 7.7318C240.399 8.16355 240.86 8.91826 240.86 9.72V52.64C240.86 53.4417 240.399 54.1965 239.63 54.6282C237.198 55.9882 235.119 57.9408 233.592 60.2841Z" strokeWidth="2"></path>
                            </svg>

                            <div>
                                {newCartItem.isLoading? 
                                    <div>
                                         <Lottie 
                                            options={{
                                                ...defaultOptions,
                                                animationData: spinner
                                            }}
                                            height={20}
                                            width={20}
                                        />
                                    </div> : null
                                }
                                
                                <span>ADD TO CART</span>
                            </div>

                            {newCartItem.isError &&
                            <div ref={cartError} className='add-to-cart__error'>
                                <div>
                                    Sorry, there was an issue adding this item to the cart. Please try again.
                                </div>
                            </div>
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