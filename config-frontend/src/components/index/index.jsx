import './index.scss';
import { useRef, useState } from 'react';
import Marquee from "react-fast-marquee";
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { backgroundImages, imageCollage } from '../../utils';
import { useMediaQuery } from 'react-responsive'
import { get, collections, comments } from '../../utils';
import quote from '/images/icons8-quote-left-48.png'
import buttonIcon from '/icons/button-shape.svg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Index = () => {
    const slider = useRef()
    const indexSlider = useRef();
    const cakeSlice =  useRef();
    const cakeSlide = useRef();
    const [autoPlay, setAutoPlay] = useState(true)
    const [cakeState, setCakeState] = useState(false)
    const [colorScheme, setColorScheme] = useState(backgroundImages[0].colorScheme)
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})


    window.addEventListener("scroll", () => {
        let currentTop = cakeSlice.current?.getBoundingClientRect().top;
        let slideTop = cakeSlide.current?.getBoundingClientRect().top

        setCakeState(isMobile || currentTop < 480? false: true)

        if (!isMobile && cakeSlice.current) {
            cakeSlice.current.style.transform = `translate(${slideTop < 520? -50 : -100}%, -41.5%)`
        }
    });


    const { isError, 
            isLoading, 
            data, 
            isPlaceholderData
        } = useQuery({
        queryKey: ['categories'],
        queryFn: () => get('categories/'),
        placeholderData: []
    })


    const handleClick = (position) => {
        if (position === 'prev') {
            indexSlider?.current?.slickPrev()

        } else if (position === 'next') {
            indexSlider?.current?.slickNext()
        }
        setAutoPlay(false)
    }


    const settings = {
        dots: true,
        autoplay: autoPlay,
        infinite: true,
        pauseOnHover: true,
        autoplaySpeed: 5000,
        speed: 200,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (
            <div>
              <ul 
                style={{ margin: 0, padding: 0 }}
                onClick={() => setAutoPlay(false)}>
                {dots}
            </ul>
            </div>
        ),
        afterChange: (current) => {
            setColorScheme(backgroundImages[current].colorScheme)
        }  
    }


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
                slidesToShow: 1,
                draggable: true,
                swipe: true,
                slidesToScroll: 1,
                swipeToSlide: true,
              }
            }
          ]
    }
    

    return ( 
            <section className='index'>
                <div>
                    <Slider ref={indexSlider} {...settings}>
                        {backgroundImages.map((item, index) => (
                            <div key={item.id} className="wrapper" >    
                                <div style={{backgroundImage: `url(${item.background})`}}>
                                    <div className='svg-wrapper'>
                                        <img src={item.svg} alt={item.desc} loading='lazy'/>
                                        <div className='descriptions'>
                                            <h1>{item.header}</h1>
                                            <p>{item.paragraph}</p>
                                            <div className='tab-view'>
                                                <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1697689063/noun-decorative-line-4253413-cropped_jgf417.png'} alt="line break" srcSet="" loading='lazy' />
                                                <p>{item.lineBreakText}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    
                    <div className="buttons">
                        <button onClick={() => handleClick('prev')}>
                            <ion-icon 
                            name="chevron-back-circle-sharp"
                            style={{color: colorScheme}}></ion-icon>
                        </button>

                        <button onClick={() => handleClick('next')}>
                            <ion-icon 
                            name="chevron-forward-circle-sharp"
                            style={{color: colorScheme}}></ion-icon>
                        </button>
                    </div>
                </div>
                
                <div>
                    <div>
                        <h1>Our products</h1>
                        <p>
                            Get ready to embark on a gastronomic journey {isMobile? <br/> : null} with us as we unlock a world of flavors
                            {isMobile? '' : <span>and discover the true artistry behind the finest food products</span>}.
                        </p>
                    </div>

                    <div>
                        <ul>
                            <li onClick={() => slider?.current?.slickPrev()}>
                                <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                            </li>
                            <li onClick={() => slider?.current?.slickNext()}>
                                <ion-icon name="chevron-forward-circle-sharp"></ion-icon>
                            </li>
                        </ul>      

                        <div className="products">
                                {isLoading || isPlaceholderData? 
                                    <>
                                        {[...Array(5)].map((x, index) => (
                                            <div className='product-preloader' key={index}></div>
                                        ))}
                                    </>
                                    : 
                                    <>
                                    <Slider ref={slider}  {...productSettings}>
                                        {data?.map(product => (
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
                                        ))}
                                    </Slider>
                                    </>
                                }
                        </div>
                    </div>
                </div>

                <div className="collections">
                    <div>
                        <h1>Sweets for any gathering</h1>
                        <p>Whether it's a holiday, special event, or reason to celebrate, we have everything you need.</p>
                    </div>

                    <div>
                    <Slider {...collectionSettings}>
                        {collections.map(collection => (
                            <Link to={collection.parameter} key={collection.id}>
                                <div className='collection-item'>
                                    <div>
                                        <img src={import.meta.env.VITE_CLOUD_URL + collection.image} alt={collection.desc} loading='lazy'/>
                                    </div>
                                    <div>
                                        <p>{collection.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        </Slider>
                    </div>
                </div>

                <div className="store-services">
                    <div>
                        <div className='store-service-icon-wrapper'>
                            <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1725537946/Group_937_hdu5w1.avif'} alt="pickup icon"/>
                        </div>

                        <div className='store-service-description'>
                            <h1>Package pickup</h1>
                            <p> Our classic treats are made daily in our bakery, 
                                using only the freshest & finest ingredients.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className='store-service-icon-wrapper'>
                            <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1725537946/image_1_89ae0220-2892-4bef-bd97-1c9640d9066d_bswjvs.avif'} alt="local shipping icon" />
                        </div>

                        <div className='store-service-description'>
                            <h1>Local delivery</h1>
                            <p>We deliver locally to homes and businesses 
                                near our offices in Jos and Abuja.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className='store-service-icon-wrapper'>
                            <img src={import.meta.env.VITE_CLOUD_URL + 'image_2_2749fe47-cc68-4e19-bd2f-7de8fd48a580_m6io3q.avif'} alt="nationwide shipping icon"/>
                        </div>

                        <div className='store-service-description'>
                            <h1>Nationwide shipping</h1>
                            <p>Nene's delicacy is now shipping our cakes to up to 6 states in Nigeria, 
                                more states incoming!
                            </p>
                        </div>
                    </div>
                </div>

                <div className='trellis-comment'>
                    <div>
                        <div>
                            <span>We've got you covered</span>
                            <h1>A Delicious Treat For Any Celebration</h1>
                        </div>

                        <div data-trellis-cake-wrapper="">
                            <div className="trellis-cake trellis-cake-half" style={{opacity: cakeState? 0:1}}>
                                <img src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1725689900/cake-slice-missing_msdzyi.webp'} alt="complete cake icon" loading='lazy'/>
                            </div>

                            <div className="trellis-cake trellis-cake-full" style={{opacity: cakeState? 1:0}}>
                                <img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1725689901/cakepieces-wholecake_qs3eyk.webp"} alt="cake with missing icon" loading='lazy'/>
                            </div>
                        </div>
                    </div>

                    <div ref={cakeSlice} className="trellis-cake-slice">
                        <img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1725689900/cake-slice_s4wllk.webp"} alt="cake slice icon" loading='lazy'/>
                    </div> 

                    <div className='cake-slide'>
                        <div ref={cakeSlide}></div>

                        <div className='comments'>
                        {comments.map(comment => (
                             <div key={comment.id}>
                                 <div>
                                    <img className='comment-image' src={import.meta.env.VITE_CLOUD_URL + comment.url} alt={comment.desc} loading='lazy'/>
                                 </div>

                                 <div>
                                    <p>
                                        <span className='quote'>
                                            <img src={quote} alt="opening quote icon" loading='lazy'/>
                                        </span>

                                        {comment.comment}

                                        <span className='quote'>
                                            <img src={quote} alt="closing quote icon" loading='lazy' />
                                        </span>
                                    </p>
                                 </div>
                             </div>
                               ))}
                         </div>
                    </div>

                    <div className='cake-confetti'>
                        <img src={import.meta.env.VITE_CLOUD_URL + "image/upload/v1725969168/cake-explosion_ibdh0q.gif"} alt="animated cake confetti" loading='lazy'/>
                    </div>

                    <div></div>
                </div>

                <div className='events-infinite-scroll'>
                       <ul>
                            <Marquee {...{pauseOnHover: true, pauseOnClick: true}}>
                                <li>Graduation</li>
                                <li>Promotion</li>
                                <li>Wedding</li>
                                <li>End of finals</li>
                                <li>Just because</li>
                                <li>TGIF</li>
                                <li>Birthday</li>
                                <li>New job</li>
                                <li>Anniversary</li>
                                <li>Naming ceremony</li>
                                <li>Retirement</li>
                                <li>Dinner party</li>
                            </Marquee>
                        </ul>
                </div>
                
                <div className="image-collage-section">
                    <div>
                        <h1>No matter the size, be sure to tag us in your celebrations!</h1>
                        <p>#nenesdelicacy</p>
                    </div>
                    
                    <div className='image-collage'>
                        {imageCollage.map((collage, index) => (
                            <div key={index}>
                                {collage.map(image => (
                                    <span key={image.id}>
                                        <img src={import.meta.env.VITE_CLOUD_URL + image.url} alt={image.title} loading='lazy'/>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="catering-service">
                    <div>
                        <h1>Catering & Events</h1>
                        <p> Catering and Events will soon be available to bring 
                            Nene's Delicacy finest creations to your special occasions. 
                            Whether it's an intimate gathering or a grand celebration, 
                            we’ll have you covered with custom selections—no event is 
                            too big or too small! Stay tuned for updates!
                        </p>
                        <button>
                            <span>Coming Soon</span>
                            <img src={buttonIcon} alt="Icon that links to Catering and Events page" loading='lazy'/>
                        </button>
                    </div>

                    <div>
                        <img 
                            src={import.meta.env.VITE_CLOUD_URL + 'image/upload/v1726372189/website02_1280x_exse9h.png'} 
                            alt="three layered, white foundant cake with middle tier decorated with sprinkles" 
                            loading='lazy'/>
                    </div>
                </div>
            </section>
     );
}

export default Index;