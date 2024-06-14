import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
import ProductPreloader from './productPreloader'
import NotFound from '../404/404';
import { Link } from 'react-router-dom';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from '../../utils';
import './product.scss';
import '../preloader/preloader.scss'


const Product = () => {
    
    const [current, setCurrent] = useState({product_name: '404 Not Found', id: null})
    const param = useParams()
    window.scrollTo(0, 0)


    useEffect(() => {
        get('categories').then(res => {
            const result = res.find(type => type.parameter === param.type)
            if (result) setCurrent(result)
        })
    }, [])


    document.title = `${current.product_name} | Nene's Delicacy `;


    const { isError, isLoading, data } = useQuery({
        queryKey: ['products'],
        queryFn: () => get('products'),
        select: useCallback(
            (data) => data.filter(product => product.product_type.id === current.id)
        )
    }, )

    // if (!current.id) {
    //     return <NotFound />
    // }
    
    if (isLoading) {
        return <ProductPreloader />
    }

    if (isError) {
        return <Error />
    }

    
    return (
        <>
         <section className='product'>
            <div>
                <div>
                    <ul className="links">
                        <li><a href="/">Home</a></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{current.product_name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{current.product_name}</h1>
                        <div>{current.banner_text}</div>
                    </div>
                </div>
                <div><img src={import.meta.env.CLOUD_NAME/current.banner_image} alt="colorful cake" srcSet="" loading='lazy'/></div>
            </div>

            <div className="products">
                {data.map(product => (
                    <Link to={product.name} key={product.id}>
                        <div>
                            <div className='image-wrapper'>
                                <LazyLoadImage
                                height='100%'
                                width='100%'
                                src={import.meta.env.CLOUD_NAME/product.image} 
                                effect='blur'
                                alt={product.name}
                                placeholderSrc={product.lazyImage}/>
                            </div>

                            <div> 
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <div>
                                    <span className='naira'>
                                        <FontAwesomeIcon icon={faNairaSign} />
                                    </span>   
                                    <span>{Intl.NumberFormat("en-US").format(product.unit_price)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    </>   
    );
}

export default Product;