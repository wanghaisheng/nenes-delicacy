import './index.scss';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { backgroundImages } from '../../utils';
import { useMediaQuery } from 'react-responsive'
import { get } from '../../utils';
import { Link } from 'react-router-dom';



const Index = () => {
    const slider = useRef()
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})


    const slide = (el) => {
        const scrollLength = (window.innerWidth / 385) * 385

        if (el.target.name.includes('forward')) {
            slider.current.scrollBy({left: scrollLength, behavior: "smooth"})

        } else {
            slider.current.scrollBy({left: -scrollLength, behavior: "smooth"})
        }
    }


    const { isError, isLoading, data, isPlaceholderData} = useQuery({
        queryKey: ['categories'],
        queryFn: () => get('categories/'),
        placeholderData: []
    })


    return ( 
            <section className='index'>
                <div>
                    {backgroundImages.map(item => (
                        <div key={item.id} className="wrapper" style={{backgroundImage: `url(${item.background})`}}>
                            <div>
                            <svg viewBox="0 0 532 632" fill="#fefefe9c" xmlns="http://www.w3.org/2000/svg">
                                <path id="shape" d="M532 76.4861C532 71.582 528.122 67.4877 523.207 67.3077C425.131 63.6634 365.519 0 266 0C166.481 0 106.869 63.6634 8.7928 67.3077C3.87773 67.4877 0 71.582 0 76.4861V560.103C0 563.477 1.89368 566.537 4.86978 568.202C28.7237 581.609 47.8879 602.08 59.2512 626.691C60.7843 629.975 64.1663 632 67.7737 632H464.226C467.833 632 471.26 629.975 472.749 626.691C484.112 602.08 503.231 581.609 527.13 568.202C530.106 566.537 532 563.477 532 560.103V76.4861V76.4861Z" />
                            </svg>
                                <div>
                                    <h1>{item.header}</h1>
                                    <p>{item.paragraph}</p>

                                    <div className='tab-view'>
                                        <img src='https://res.cloudinary.com/dqdtnitie/image/upload/v1697689063/noun-decorative-line-4253413-cropped_jgf417.png' alt="line break" srcSet="" loading='lazy' />
                                        <p>{item.lineBreakText}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div>
                    <div>
                        <h1>Our products</h1>
                        <p>
                            Get ready to embark on a gastronomic journey with us as we unlock a world of flavors
                            {isMobile? '' : <span>and discover the true artistry behind the finest food products</span>}.
                        </p>
                    </div>

                    <div>
                        <ul>
                            <li onClick={(el) => slide(el)}><ion-icon name="chevron-back-circle-sharp"></ion-icon></li>
                            <li onClick={(el) => slide(el)}><ion-icon name="chevron-forward-circle-sharp"></ion-icon></li>
                        </ul>               
                        <div ref={slider} className="products">
                            {isLoading || isPlaceholderData? 
                                <>
                                    {[...Array(5)].map((x, index) => (
                                        <div className='product-preloader' key={index}></div>
                                    ))}
                                </>
                                : 
                                <>
                                {data?.map(product => (
                                <Link to={product.parameter} key={product.id}>
                                    <div>
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
                                </>
                             }
                        </div>
                    </div>
                </div>
            </section>
     );
}

export default Index;