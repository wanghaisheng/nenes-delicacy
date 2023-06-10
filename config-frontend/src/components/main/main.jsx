import './main.scss';
import { useRef, useEffect } from 'react';
import Footer from '../footer/footer'

const Main = () => {

    const slider = useRef()
    useEffect(() => {
        
    }, [])

    return ( 
        <>
            <section className='main'>
                <div className="wrapper">
                    <div>
                        <svg viewBox="0 0 532 632" fill="#ffffff99" xmlns="http://www.w3.org/2000/svg">
                            <path d="M532 76.4861C532 71.582 528.122 67.4877 523.207 67.3077C425.131 63.6634 365.519 0 266 0C166.481 0 106.869 63.6634 8.7928 67.3077C3.87773 67.4877 0 71.582 0 76.4861V560.103C0 563.477 1.89368 566.537 4.86978 568.202C28.7237 581.609 47.8879 602.08 59.2512 626.691C60.7843 629.975 64.1663 632 67.7737 632H464.226C467.833 632 471.26 629.975 472.749 626.691C484.112 602.08 503.231 581.609 527.13 568.202C530.106 566.537 532 563.477 532 560.103V76.4861V76.4861Z" />
                        </svg>
                        <div>
                            <h1>Welcome to Nene's delicacy</h1>
                            <p> We invite you to enter a world where buttery
                                perfection meets irresistible flavors, where each
                                bite transports you to a realm of pure bliss.
                            </p>
                            <div className='tab-view'>
                                <img src="images/noun-decorative-line-4253413.png" alt="line break" srcset="" />
                                <p>whether you're celebrating a special occasion or simply craving a moment of indulgence, let us be your trusted companion on this journey of sweet ecstasy</p>
                            </div>
                        </div>
                    </div>
            
                </div>
                <div>
                    <h1>Our projects</h1>
                    <p>
                        Get ready to embark on a gastronomic journey with us as we unlock a world of flavors <br/>
                        <span className='laptop-view'>and discover the true artistry behind the finest food products</span>.
                    </p>
                    <div className='products' ref={slider}>
                       
                        <div>
                            <img src="images/cake.jpg" alt="vanilla cake" />
                            <div><p>Cakes</p></div>
                        </div>
                        <div>
                            <img src="images/sugar glazed doughnut.jpg" alt="dougnut stuffed with nutella" />
                            <div><p>Pastries</p></div>
                        </div>
                        <div>
                            <img src="images/chops.png" alt="small chops" />
                            <div><p>Finger food</p></div>
                        </div>
                        <div>
                            <img src="images/chocolate-chip-muffin.jpg" alt="small chops" />
                            <div><p>Cup cakes</p></div>
                        </div>
                        <div>
                            <img src="images/chocolate-chip-cookies.jpg" alt="small chops" />
                            <div><p>Cookies</p></div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
     );
}

export default Main;