import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { get } from '../../utils';
import { useRef } from 'react';
import { Pagination, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './collection.scss' 



const Collection = () => {

    const collection = useQuery({
        queryKey: ['collections'],
        queryFn: () => get('categories/collection/'),
        placeholderData: []
    })

    

    return (
        <div className="collections">
            <div>
                <h1>Sweets for any gathering</h1>
                <p>Whether it's a holiday, special event, or reason to celebrate, we have everything you need.</p>
            </div>

            <div>
                <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={10}
                        grabCursor={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Pagination, Navigation]}
                        className="slider-class"
                    >
                        {collection.isFetching ? (
                            [...Array(4)].map((_, index) => (
                                <SwiperSlide key={index}>
                                    <div className="collections-preloader"></div>
                                </SwiperSlide>
                            ))
                        ) : (
                            collection.data?.map((collection) => (
                                <SwiperSlide key={collection.name}>
                                    <Link
                                        to={`collections/${encodeURIComponent(collection.name)}`}
                                    >
                                        <div className="collection-item">
                                            <div>
                                                <LazyLoadImage
                                                    width="100%"
                                                    height="100%"
                                                    src={`${import.meta.env.VITE_CLOUD_URL}${collection.image}`}
                                                    effect="blur"
                                                    alt={collection.alt || "Collection image"}
                                                    placeholderSrc={`${import.meta.env.VITE_CLOUD_URL}${collection.lazyImage}`}
                                                />
                                            </div>
                                            <div>
                                                <p>{collection.name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        )}
                </Swiper>
            </div>
        </div>
    )
}

export default Collection;