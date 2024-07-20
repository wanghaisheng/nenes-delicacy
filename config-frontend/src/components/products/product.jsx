import { useCallback } from 'react';
import { useQuery } from 'react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
import ProductPreloader from './productPreloader'
import { Link } from 'react-router-dom';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from '../../utils';
import './product.scss';
import '../preloader/preloader.scss'


const Product = () => {
    
    const pathname = window.location.pathname.replace(/\//g,'')
   
    const { isError, isLoading, data, refetch} = useQuery({
        queryKey: ['products'],
        queryFn: () => get('products/'),
        select: useCallback(
            (data) => data.filter(product => {
                return product.product_type.parameter === pathname
            }),
        )
    }, )


    const current = data? data[0].product_type: ''
    document.title = `${current.name} | Nene's Delicacy `;


    if (isLoading) {
        return <ProductPreloader />
    }

    if (isError) {
        return <Error refetch={refetch} message={`An error occured, while fetching ${current.name}`} />
    }

    
    return (
        <>
         <section className='product'>
            <div>
                <div>
                    <ul className="links">
                        <li><a href="/">Home</a></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{current.name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{current.name}</h1>
                        <div>{current.bannerText}</div>
                    </div>
                </div>
                <div><img src={import.meta.env.VITE_CLOUD_URL+current.bannerImage} alt="colorful cake" srcSet="" loading='lazy'/></div>
            </div>

            <div className="products">
                {data.map(product => (
                    <Link to={product.name} key={product.id}>
                        <div>
                            <div className='image-wrapper'>
                                <LazyLoadImage
                                src={import.meta.env.VITE_CLOUD_URL+product.image} 
                                effect='blur'
                                alt={product.name}
                                placeholderSrc={import.meta.env.VITE_CLOUD_URL+product.lazyImage}/>
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