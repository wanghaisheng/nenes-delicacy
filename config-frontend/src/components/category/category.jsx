import './category.scss'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useEffect } from 'react';
import { get } from '../../utils';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from 'react-query';


const ProductCategory = () => {
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})

    const { 
            isFetching, 
            data } = useQuery({
        queryKey: ['categories'],
        queryFn: () => get('categories/'),
        placeholderData: []
    })


    useEffect(() => {}, [data])


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
                        <li className='swiper-prev-button'>
                            <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                        </li>
                        <li className='swiper-next-button'>
                            <ion-icon name="chevron-forward-circle-sharp"></ion-icon>
                        </li>
                    </ul>
                </div>     

                <div className="products">
                   
                <Swiper 
                    slidesPerView={'auto'}
                    loop={true}
                    grabCursor={true}
                    autoplay={{delay: 2500,
                        disableOnInteraction: true,}}
                    keyboard={{
                        enabled: true
                    }}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-next-button',
                        prevEl: '.swiper-prev-button'
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {isFetching ? (
                        [...Array(4)].map((x, index) => (
                            <SwiperSlide key={index}>
                                <div className='product-preloader'></div>
                            </SwiperSlide>
                        ))
                    ) : (
                        data?.map(product => (
                            <SwiperSlide  key={product.id}>
                                <Link to={`products/${product.parameter}`}>
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
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
                </div>
            </div>
        </div>
     );
}

export default ProductCategory;