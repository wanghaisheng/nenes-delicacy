import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { get } from '../../utils';
import { useRef } from 'react';
import Slider from "react-slick"; 
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './collection.scss' 



const Collection = () => {
    const slider = useRef();

    const collection = useQuery({
        queryKey: ['collections'],
        queryFn: () => get('categories/collection/'),
        placeholderData: []
    })

    
    const collectionSettings = {
        className: "slider variable-width",
        dots: false,
        arrows: false,
        slidesToScroll: 0,
        swipe: false,
        draggable: false,
        infinite: false,
        variableWidth: true,
        adaptiveHeight: true,
        responsive: [
        
            {
              breakpoint: 880,
              settings: {
                infinite: true,
                dots: true,
                slidesToShow: 1,
                draggable: true,
                swipe: true,
                slidesToScroll: 1,
                swipeToSlide: true,
              }
            },

            {
                breakpoint: 768,
                settings: {
                  dots: true,
                }
            }
        
          ]
    }
    

    return (
        <div className="collections">
            <div>
                <h1>Sweets for any gathering</h1>
                <p>Whether it's a holiday, special event, or reason to celebrate, we have everything you need.</p>
            </div>

            <div>
                {collection.isFetching? 
                    <Slider ref={slider}  {...collectionSettings}>
                        {[...Array(5)].map((x, index) => (
                            <div className='collections-preloader' key={index}></div>
                        ))}
                    </Slider> : null}


                {collection.data? 
                    <Slider {...collectionSettings}>
                        {collection.data?.map(collection => (
                            <Link to={`collections/${collection.name}`} key={collection.id}>
                                <div className='collection-item'>
                                    <div>
                                        <LazyLoadImage
                                            width='100%'
                                            height='100%'
                                            src={import.meta.env.VITE_CLOUD_URL + collection.image}
                                            effect='blur'
                                            alt={collection.alt}
                                            placeholderSrc={import.meta.env.VITE_CLOUD_URL + collection.lazyImage}
                                            />
                                    </div>

                                    <div>
                                        <p>{collection.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </Slider> : null}
            </div>
        </div>
    )
}

export default Collection;