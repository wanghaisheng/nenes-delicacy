import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Pagination from '../pagination/pagination';
import { useState, useEffect} from "react";
import ProductPreloader from "../products/productPreloader";
import { Error } from "../preloader/preloader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { get } from "../../utils";
import '../products/product.scss'
import './search.scss'
import { useLocation } from 'react-router-dom';


const Search = () => {

    const queries = new URLSearchParams(useLocation().search);
    const query  = queries.get('query');
    const navigate = useNavigate()
    const page  = queries.get('page');
    const [currentPage, setCurrentPage] = useState(page? parseInt(page) : 1)
    const [filter, setFilter] = useState('recommended')
    
    
    const { 
            data, 
            isLoading, 
            isError, 
            refetch, 
            isFetching } = useQuery({

        queryKey: ['search', query, filter, currentPage],
        queryFn: () =>  get(`products/search?query=${query}&filter_by=${filter}&page=${currentPage}`),
        enabled: query != '',
        keepPreviousData: true,
        staleTime: Infinity,
        retry: 1, 
    })


    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `${query} | Nene's Delicacy `;
    }, [query])


    const handlePageChange = (page) => {
        setCurrentPage(page)
        navigate(`/search?query=${query}&page=${page}`)
    }


    if (isError) {
        return <Error refetch={refetch}/>
    }


    if (isLoading) {
        return (
            <ProductPreloader/>)
        }


    return ( 
        <section className="product"> 
            <div>
                <div className="search-banner-text banner-text-container">
                    <ul>
                        <li><Link to="/products">Our Products</Link></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>Results</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>Results for <span>"{query}"</span></h1>
                        {data? <div>Found total of {data.count} results</div> : null}
                    </div>
                </div>
                <div><img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1724190275/2149299436_1_mwtrxg.jpg'} alt="colorful cake" srcSet="" loading='lazy'/></div>
            </div>

            {data && data.results.length != 0? 
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

                    <div className="banner-text mobile-search-banner-text">
                        <h1>Results for <span>"{query}"</span></h1>
                        {data? <div>Showing total of {data.count} results</div> : null}
                    </div>

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
                                        <div className="naira-wrapper">
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
                </div> : 
                
                <div className="no-results">
                    <div className="banner-text mobile-search-banner-text">
                        <h1>Results for <span>"{query}"</span></h1>
                        {data? <div>Showing total of {data.count} results</div> : null}
                    </div>
                    <div>Please try a different search term or go back to the homepage.</div>
                </div>
            } 

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
     );
}

export default Search ;