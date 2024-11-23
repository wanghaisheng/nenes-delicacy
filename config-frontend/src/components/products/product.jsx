import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Error } from '../preloader/preloader'
import ProductPreloader from './productPreloader'
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../pagination/pagination'
import { get } from '../../utils';
import './product.scss';
import '../preloader/preloader.scss'


const Product = () => {
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
            data, 
            refetch
        } = useQuery({ 
        queryKey: ['products', filter, pathname, currentPage],
        queryFn: () => get(`products/get_product/?pathname=${pathname}&filter_by=${filter}&page=${currentPage}`),
        keepPreviousData: true,
    }, )


    useEffect(() => {
        window.scrollTo(0, 0)
        if (data) {
            document.title = `${data.isCollection? data.collection.name : data.category.name} | Nene's Delicacy `;
        } else {
            document.title = "Nene's Delicacy"
        }
    }, [data])


    const handlePageChange = (page) => {
        setCurrentPage(page)
        navigate(`/products?page=${page}`)
    }


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
                        <li><Link to="/">Home</Link></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li><Link to={data.isCollection? "/collections":"/products"}>{data.isCollection? 'Collections' : 'Products'}</Link></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{data.isCollection? data.collection.name : data.category.name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{data.isCollection? data.collection.name : data.category.name}</h1>
                        <div>{data.isCollection? data.collection.description : data.category.bannerText}</div>
                    </div>
                </div>
                <div>
                    <img src={`${import.meta.env.VITE_CLOUD_URL}${data.isCollection ? data.collection.image : data.category.bannerImage}`} />
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

                <h1>{data.isCollection? data.collection.name : data.category.name}</h1>

                <div className="products">
                    {data.results.map(product => (
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
                                            <img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1731311449/naira_k99wwn.png" alt="" />
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
            <div className="pagination">
                <Pagination
                    currentPage={currentPage}
                    totalCount={data.count}
                    pageSize={data.page_size}
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
        </section> 
    );
}

export default Product;