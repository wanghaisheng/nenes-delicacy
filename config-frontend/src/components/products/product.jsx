import { useCallback, useState } from 'react';
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
    
    const url = window.location.href
    const [filter, setFilter] = useState('recommended')
    const pathname = url.substring(url.lastIndexOf('/') + 1);
   

    const { isError, 
            isLoading, 
            isFetching,
            data, 
            refetch
        } = useQuery({ 
        queryKey: ['products', filter, pathname],
        queryFn: () => get(`products/?parameter=${pathname}&filter_by=${filter}`),
        select: useCallback(
            (data) => {
                console.log(data)
                return {
                    products: data,
                    category: data.find(product=> {
                        return product.product_type.parameter === pathname
                    }).product_type
                }
            }
        ),
        keepPreviousData: true,
    }, )


    
    if (isLoading) {
        return <ProductPreloader />
    }


    if (isError) {
        return <Error 
                refetch={refetch} 
                message={`An error occured, while fetching products`}/>
    }

    
    return (
        
        <section className='product'>
            <div>
                <div className='banner-text-container product-banner-text'>
                    <ul className="links">
                        <li><a href="/">Home</a></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{data.category.name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{data.category.name}</h1>
                        <div>{data.category.bannerText}</div>
                    </div>
                </div>
                <div><img src={import.meta.env.VITE_CLOUD_URL+data.category.bannerImage} alt="colorful cake" srcSet="" loading='lazy'/></div>
            </div>
            
            <div>
                <div className='radio-wrapper'>
                    <h1>Filter By</h1>
                    <div>
                        <label>
                            <input
                            type="radio"
                            value="recommended"
                            onChange={() => setFilter('recommended')}
                            checked={filter === 'recommended'}
                            />
                            <span className='custom-radio-input'></span>
                            Recommended
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                            type="radio"
                            value="low-to-high"
                            onChange={() => setFilter('asc')}
                            checked={filter === 'asc'}
                            />
                            <span className='custom-radio-input'></span>
                            Low to high
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                            type="radio"
                            value="high-to-low"
                            onChange={() => setFilter('desc')}
                            checked={filter === 'desc'}
                            />
                            <span className='custom-radio-input'></span>
                            High to low
                        </label>
                    </div>
                </div>

                <div className='radio-dropdown'>
                    <select required onChange={(e) => setFilter(e.target.value)}>
                        <option value="recommended">Recommended</option>
                        <option value="asc">low to high</option>
                        <option value="desc">high to low</option>
                    </select>
                </div>   

                <h1>{data.category.name}</h1>

                <div className="products">
                    {data.products.map(product => (
                        <Link to={`/${product.name}`.replace(/ /g,'-').toLowerCase()} key={product.id}>
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
                                    <div className='naira-wrapper'>
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

            </div>

            {isFetching?
                <div className='spinner'>
                    <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1721250342/spinner-trans-bg_r89iew.gif'} alt="loading spinner" />
                </div> : ''
            }
        </section> 
    );
}

export default Product;