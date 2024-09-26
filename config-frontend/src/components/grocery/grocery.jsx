import { useQuery } from 'react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
// import ProductPreloader from './productPreloader'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from '../../utils';
import '../products/product.scss';
import './grocery.scss'
import Slider from 'react-slick';
// import '../preloader/preloader.scss'



const Grocery = () => {
    const [filter, setFilter] = useState('recommended')

    const { isError, 
            isLoading,
            isFetching,
            data, 
            refetch
        } = useQuery({
        queryKey: ['products', filter],
        queryFn: () => get(`products/?filter_by=${filter}`),
        keepPreviousData: true,
        placeholderData: []
    })
    
  
    document.title = `products | Nene's Delicacy `;


    if (isLoading) {
        <div>Loading..</div>
    }


    if (isError) {
        return <Error refetch={refetch} message={`An error occured, while fetching products`} />
    }


    return ( 
        <section className='product'>
             <div>
                <div className='banner-text-container product-banner-text'>
                    <ul className="links">
                        <li><a href="/">Continue Shopping</a></li>
                    </ul>
                    <div className='banner-text'>
                        <h1>Our Products</h1>
                        <div>
                            Discover our full range of products, perfect for any occasion.
                            From freshly baked goods to specialty treats, explore our curated
                            selection to find the ideal items for your needs.
                        </div>
                    </div>
                </div>
                <div><img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1726907525/Group_Shot__43_j7cu4p.webp'} alt="colorful cake" srcSet="" loading='lazy'/></div>
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

                <h1>All products</h1>

                <div className="products">
                    {data.map(product => (
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

export default Grocery ;