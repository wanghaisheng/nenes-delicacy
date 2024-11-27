import { useQuery } from '@tanstack/react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
import ProductPreloader from '../products/productPreloader';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Pagination from '../pagination/pagination';
import { get } from '../../utils';
import '../products/product.scss';
import './grocery.scss'
import '../preloader/preloader.scss'


const Grocery = () => {
    const navigate = useNavigate()
    const [filter, setFilter] = useState('recommended')
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment !== '');
    const pathname = segments[segments.length - 1];
    const queries = new URLSearchParams(useLocation().search);
    const page  = queries.get('page');
    const [currentPage, setCurrentPage] = useState(page? parseInt(page) : 1)



    const { isError, 
            isLoading,
            isFetching,
            error,
            data, 
            refetch
        } = useQuery({
        queryKey: ['products', filter, currentPage],
        queryFn: () => get(`products?filter_by=${filter}&collection=${pathname}&page=${currentPage}`),
        keepPreviousData: true,
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `Products | Nene's Delicacy `;
    }, [data])


    const handlePageChange = (page) => {
        setCurrentPage(page)
        navigate(`/products?page=${page}`)
    }


    if (isLoading) {
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
                        <li>Products</li>
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
                    {data?.results.map(product => (
                        <Link to={`/${product.name}`} key={product.id}>
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

            {isFetching?
                <div className='spinner'>
                    <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1721250342/spinner-trans-bg_r89iew.gif'} alt="loading spinner" />
                </div> : null}

            <div className='pagination'>
                <Pagination
                    currentPage={currentPage}
                    totalCount={data.count}
                    pageSize={data.page_size}
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
        </section>
     )
}

export default Grocery ;