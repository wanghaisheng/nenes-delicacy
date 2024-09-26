import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import ProductPreloader from "../products/productPreloader";
import { Error } from "../preloader/preloader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { get } from "../../utils";
import '../products/product.scss'
import './search.scss'
import { useLocation } from 'react-router-dom';


const Search = () => {

    const queries = new URLSearchParams(useLocation().search);
    const query  = queries.get('query');
    

    const { data, isLoading, isError, refetch, isFetching} = useQuery({
        queryKey: ['search', query],
        queryFn: () =>  get(`products/search/?query=${query}`),
        enabled: query != '',
        staleTime: Infinity,
        retry: 1, 
    })


    if (isLoading) {
        return (
            <ProductPreloader/>)}


    return ( 
        <section className="product"> 

            <div>
                <div className="search-banner-text banner-text-container">
                    <ul>
                        <Link to="/products">
                            <li>Our Products</li>
                        </Link>
                    </ul>
                    <div className='banner-text'>
                        <h1>Results for <span>"{query}"</span></h1>
                        {data? <div>Showing total of {data.length} results</div> : null}
                    </div>
                </div>
                <div><img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1724190275/2149299436_1_mwtrxg.jpg'} alt="colorful cake" srcSet="" loading='lazy'/></div>
            </div>

            <div className="banner-text mobile-search-banner-text">
                <h1>Results for <span>"{query}"</span></h1>
                {data? <div>Showing total of {data.length} results</div> : null}
            </div>

            {isError? <Error refetch={refetch}/> : null}

            {isFetching?<div className="loader"><img src="https://res.cloudinary.com/dqdtnitie/image/upload/v1721250342/spinner-trans-bg_r89iew.gif" alt="" /></div> : null}

           
            {data && data.length != 0? 
                <div className="products">
                    {data?.map(product => (
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
                                    <div className="naira-wrapper">
                                        <span className='naira'>
                                            <FontAwesomeIcon icon={faNairaSign} />
                                        </span>   
                                        <span>{Intl.NumberFormat("en-US").format(product.unit_price)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div> : 
                
                <div className="no-results">
                    <div>Please try a different search term or go back to the homepage.</div>
                </div>
            } 
        </section>
     );
}

export default Search ;