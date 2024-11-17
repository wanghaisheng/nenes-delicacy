import './category.scss'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Slider from "react-slick";
import { useEffect } from 'react';
import { useRef } from 'react';
import { get } from '../../utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';


const ProductCategory = () => {
    const slider = useRef()
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})

    const { 
            isFetching, 
            data, 
        } = useQuery({
        queryKey: ['categories'],
        queryFn: () => get('categories/'),
        placeholderData: []
    })


    useEffect(() => {}, [data])

    const productSettings = {
        className: "slider variable-width center",
        centerMode: false,
        swipeToSlide: true,
        dots: true,
        arrows: false,
        infinite: true,
        variableWidth: true,
        adaptiveHeight: true,
        speed: 300,
    }


    return ( 
        <div className="product-category">
            <div>
                <h1>Our products</h1>
                <p>
                    Get ready to embark on a gastronomic journey {isMobile? <br/> : null} with us as we unlock a world of flavors
                    {isMobile? '' : <span>and discover the true artistry behind the finest food products</span>}.
                </p>
            </div>

            <div>
                <div className='product-title'>
                    <Link to={'/products'}>View all</Link>
                    <ul>
                        <li onClick={() => slider?.current?.slickPrev()}>
                            <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                        </li>
                        <li onClick={() => slider?.current?.slickNext()}>
                            <ion-icon name="chevron-forward-circle-sharp"></ion-icon>
                        </li>
                    </ul>
                </div>     

                <div className="products">
                   
                <Slider ref={slider} {...productSettings}>
                    {isFetching ? (
                        [...Array(4)].map((x, index) => (
                            <div className='product-preloader' key={index}></div>
                        ))
                    ) : (
                        data?.map(product => (
                            <Link to={`products/${product.parameter}`} key={product.id}>
                                <div className='image-wrapper'>
                                    <LazyLoadImage
                                        width='100%'
                                        height='100%'
                                        src={import.meta.env.VITE_CLOUD_URL + product.image}
                                        effect='blur'
                                        alt={product.title}
                                        placeholderSrc={import.meta.env.VITE_CLOUD_URL + product.lazyImage}
                                    />
                                    <div><p>{product.name}</p></div>
                                </div>
                            </Link>
                        ))
                    )}
                </Slider>
                </div>
            </div>
        </div>
     );
}

export default ProductCategory;