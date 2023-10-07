import './index.scss';
import { useEffect, useRef, useState} from 'react';
import { useMediaQuery } from 'react-responsive'
import { get } from '../../utils';
import { Link } from 'react-router-dom';


const Index = () => {
    const slider = useRef()
    const [products, setProducts] = useState([]);
    const isMobile = useMediaQuery({query: '(max-width: 767px)'})


    const slide = (el) => {
        const scrollLength = (window.innerWidth / 385) * 385

        if (el.target.name.includes('forward')) {
            slider.current.scrollBy({left: scrollLength, behavior: "smooth"})

        } else {
            slider.current.scrollBy({left: -scrollLength, behavior: "smooth"})
        }
    }


    useEffect(() => {

        get('categories').then(res => {
            setProducts(res)
        })

    }, [])


    return ( 
        
            <section className='index'>
                <div className="wrapper">
                    <div>
                        <svg viewBox="0 0 532 632" fill="#fefefe9c" xmlns="http://www.w3.org/2000/svg">
                            <path d="M532 76.4861C532 71.582 528.122 67.4877 523.207 67.3077C425.131 63.6634 365.519 0 266 0C166.481 0 106.869 63.6634 8.7928 67.3077C3.87773 67.4877 0 71.582 0 76.4861V560.103C0 563.477 1.89368 566.537 4.86978 568.202C28.7237 581.609 47.8879 602.08 59.2512 626.691C60.7843 629.975 64.1663 632 67.7737 632H464.226C467.833 632 471.26 629.975 472.749 626.691C484.112 602.08 503.231 581.609 527.13 568.202C530.106 566.537 532 563.477 532 560.103V76.4861V76.4861Z" />
                        </svg>
                        <div>
                            <h1>Welcome to Nene's delicacy</h1>
                            <p> We invite you to enter a world where buttery
                                perfection meets irresistible flavors, where each
                                bite transports you to a realm of pure bliss.
                            </p>
                            <div className='tab-view'>
                                <img src="images/noun-decorative-line-4253413.png" alt="line break" srcSet="" />
                                <p>whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy</p>
                            </div>
                        </div>
                    </div>     
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
                            {products.map(product => (
                            <Link to={product.parameter} key={product.id}>
                                <div>
                                    <img src={product.image} alt={product.title} />
                                    <div><p>{product.product_name}</p></div>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
    
     );
}

export default Index;