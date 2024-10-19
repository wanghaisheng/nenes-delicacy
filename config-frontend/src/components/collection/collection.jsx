import { useQuery } from 'react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
import ProductPreloader from '../products/productPreloader'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { get } from '../../utils';
import '../products/product.scss';
import './collection.scss' 
import '../preloader/preloader.scss'



const Collection = () => {
    const url = window.location.href
    const [filter, setFilter] = useState('recommended')
    const pathname = url.substring(url.lastIndexOf('/') + 1);


    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: ['collections', filter, pathname],
        queryFn: () => get(`collections/?filter_by=${filter}&pathname=${pathname}`),
        select: ((data) => {
            return {
                products: data,
                collection: data[0].collection
            }
        }),
        keepPreviousData: true,
    })
    
  
    console.log(data)
    document.title = `products | Nene's Delicacy `;

    console.log(isLoading, isFetching)


    if (isLoading || !data) {
        return <ProductPreloader />
    }


    if (isError) {
        return <Error refetch={refetch} message={`An error occured, while fetching products`} />
    }


    return ( 
        <section className='product'>
             <div>
                <div className='banner-text-container product-banner-text'>
                    <ul className="links">
                        <li><Link to="/">Home</Link></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li><Link to="/collections">Collections</Link></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{data.collection.name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{data.collection.name}</h1>
                        <div>{data.collection.description}</div>
                    </div>
                </div>
                <div>
                    <img src={import.meta.env.VITE_CLOUD_URL + data.collection.image} 
                         alt={data.collection.alt} 
                         loading='lazy'
                    />
                </div>
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

                <h1>{data.collection.name}</h1>

                <div className="products">
                    {data.products.map(product => (
                        <Link to={`/${product.name}`} key={product.id}>
                            <div>
                                <div className='image-wrapper'>
                                    <LazyLoadImage
                                    src={import.meta.env.VITE_CLOUD_URL+product.image}
                                    effect='blur'
                                    alt={product.name}
                                    placeholderSrc={import.meta.env.VITE_CLOUD_URL+product.lazyImage}
                                    />
                                </div>
                                <div>
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                    <div className='naira-wrapper'>
                                        <span className='naira'>
                                            <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1727523518/naira_aon4oj.svg" alt="" />
                                        </span>
                                        <span>{Intl.NumberFormat("en-US").format(product.unit_price)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {isFetching && !isLoading?
                <div className='spinner'>
                    <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1721250342/spinner-trans-bg_r89iew.gif'} alt="loading spinner" />
                </div> : ''
            }
        </section>
     );
}

export default Collection;