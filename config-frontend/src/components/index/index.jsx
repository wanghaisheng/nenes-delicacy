import './index.scss';
import { useRef, useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { backgroundImages } from '../../utils';
import { useMediaQuery } from 'react-responsive'
import { comments } from '../../utils';
import { useLocation } from 'react-router-dom';
import Gallery from '../gallery/gallery';
import ProductCategory from '../category/category';
import Collection from '../collection/collection';
import quote from '/images/icons8-quote-left-48.png'  
import buttonIcon from '/icons/button-shape.svg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';



const Index = () => {
    
    const cakeSlice =  useRef();
    const navigate = useNavigate();
    const errorRef = useRef()
    const cakeSlide = useRef();
    const location = useLocation();
    const [cakeState, setCakeState] = useState(false)
    const [colorScheme, setColorScheme] = useState(backgroundImages[0].colorScheme)
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})
    const isMiniMobile = useMediaQuery({query: '(max-width: 480px)'})
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {
        document.title = "Nene's Delicacy"
    }, [])


    useEffect(() => {
        
        const handleScroll = () => {
            let currentTop = cakeSlice.current?.getBoundingClientRect().top;
            let slideTop = cakeSlide.current?.getBoundingClientRect().top;

            setCakeState(isMobile || currentTop < 480 ? false : true);

            if (!isMobile && cakeSlice.current) {
                cakeSlice.current.style.transform = `translate(${slideTop < 520 ? -50 : -100}%, -41.5%)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobile]);



    useEffect(() => {

        if (location.state?.data) {
            setTimeout(() => {
                errorRef.current.remove()
            }, 8000 )
            
        }}, [location.state?.data])


    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);


    const handleSlideChange = (swiper) => {
        const activeIndex = swiper.realIndex; 
        const color = backgroundImages[activeIndex].colorScheme
        const index = document.querySelector('.index > div')
        let paginationBullets = index.querySelectorAll('.swiper-pagination-bullet');

        paginationBullets.forEach(bullet => {
            bullet.style.background = color
        })
        setColorScheme(color)
    };


    return ( 
            <section className='index'>
                <div>
                    {location.state?.data && 
                        <div ref={errorRef} className='checkout-error'>
                            {location.state?.data}
                        </div>
                    }

                    <Swiper 
                        slidesPerView={1}
                        loop={true}
                        grabCursor={true}
                        autoplay={{delay: 3000,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: true,}}
                        keyboard={{
                            enabled: true
                        }}
                        spaceBetween={0}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={{
                            nextEl: '.swiper-next-button',
                            prevEl: '.swiper-prev-button'
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        onSlideChange={handleSlideChange}
                        className="mySwiper"
                        >

                        {backgroundImages.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='hero-wrapper' style={{backgroundImage: `url(${item.background})`}}>
                                    <div>
                                        <img src={item.svg} alt={item.desc} loading='lazy'/>
                                        <div className='descriptions' style={{color: item.colorScheme}}>
                                            <h1>{item.header}</h1>
                                            <p style={{display: isMiniMobile && !item.lineBreak? 'none' : 'block'}}>{item.paragraph}</p>

                                            {item.lineBreak? 
                                                <div className='tab-view'>
                                                    <img src={item.lineBreak} alt="line break" srcSet="" loading='lazy' />
                                                    <p>{item.lineBreakText}</p>
                                                </div> : 

                                                <div className='shop-now' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                                    <button 
                                                        style={{color: isHovered? item.colorScheme : item.secondaryColor}}
                                                        onClick={() => {navigate('/products/cookies')}}>
                                                        <div>Shop Now</div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 242 63" fill={isHovered? 'white' : item.colorScheme} className="Button__svg">
                                                            <path d="M233.592 60.2841L233.591 60.2856C233.153 60.9604 232.439 61.36 231.68 61.36H10.18C9.42073 61.36 8.70676 60.9604 8.26887 60.2856C6.7404 57.9293 4.6602 55.9868 2.22891 54.6277C1.46111 54.1958 1 53.4414 1 52.64V9.72C1 8.91859 1.46114 8.16415 2.22899 7.7323C4.6603 6.37309 6.74051 4.43059 8.26898 2.0742C8.70689 1.39952 9.4208 1 10.18 1H231.68C232.439 1 233.153 1.39958 233.591 2.07437C235.119 4.43039 237.199 6.37264 239.63 7.7318C240.399 8.16355 240.86 8.91826 240.86 9.72V52.64C240.86 53.4417 240.399 54.1965 239.63 54.6282C237.198 55.9882 235.119 57.9408 233.592 60.2841Z" strokeWidth="2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="buttons">
                        <button className='swiper-prev-button' style={{color: colorScheme}}>
                            <ion-icon name="chevron-back-circle-sharp"></ion-icon>
                        </button>

                        <button className='swiper-next-button' style={{color: colorScheme}}>
                            <ion-icon name="chevron-forward-circle-sharp"></ion-icon>
                        </button>
                    </div>
                </div>

                <ProductCategory />
                <Collection />

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

                <Gallery />
                
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