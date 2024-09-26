import './footer.scss';
import emailValidator  from '../../email';
import { post } from '../../utils';
import { useEffect, useState, useRef } from 'react';
import { useMutation} from 'react-query';


const Footer = () => {
    const [email, setEmail] = useState(null)
    const inputRef = useRef()
    const [isInvalidMail, setMail] = useState()
    const [message, setMessage] = useState()
    const [display, setDisplay] = useState(false)
    

    const {data, isError, isLoading, mutate} = useMutation({
        mutationFn: async (data) => {
            console.log(email)
            const {isValid, message} = emailValidator(email)

            if (!isValid) {
                setMail(true)
                setMessage(message)
                return
            }

            setDisplay(true)
            const response = await post('email/add_email/', data)
            return response
    
        }, onError: () => {
            return "Error, couldn't subscribe your email to our newsletter"

        }, onSettled: () => {
            inputRef.current.value = ''
            setTimeout(() => {
                setDisplay(false)
            }, 5000)
        }
    })


    useEffect(() => {

        const emailElement = document.querySelector('.email-validation')
        emailElement?.style.setProperty('--after-content', `"${message}"`);

        if(isInvalidMail) {
            setTimeout(() => (
                setMail(false)
            ), 4000)
        }
    }, [isInvalidMail, message])


    const getStatus = () => {

        if (isLoading) {
            return (
                <div>
                    <img src= 'https://res.cloudinary.com/dqdtnitie/image/upload/v1721250342/spinner-trans-bg_r89iew.gif' alt="preloader" />
                    <p>Subscribing... please wait</p>
                </div>
            )}

        if (isError) {
            return (
                <div>
                    <ion-icon name="alert-circle-outline"></ion-icon>
                    <p className='status-message'>Error! Could not subscribe you to our newsletter</p>
                </div>
            )
        }

        if (data) {
            return (
                <div className='status-message'>
                    <ion-icon name="happy-outline"></ion-icon>
                    <p>{data.data}</p>
                </div>
            )
        }
    }


    return ( 
        <footer className="main-footer">

            <div className="news-letter">
                    <div data-status={display? 'active': ''} >
                        {getStatus()}
                    </div>
                     
                    <div>
                        <h1>Join our Newsletter</h1>
                        <p>Sign up to receive exclusive offers and be the first to know about seasonal specials, brand new treats, and 
                            enjoy 10% off on your birthday when you share the date with us!
                        </p>

                        <form action="">
                            <div className={isInvalidMail? 'email-validation': ''}>
                                <svg viewBox="0 0 520 65" fill="none" className="svg--desktop">
                                    <path d="M8.43002 2.53001C6.99002 4.75001 5.03002 6.58 2.74002 7.86C1.69002 8.45 1 9.52 1 10.72V53.64C1 54.84 1.69002 55.91 2.74002 56.5C5.03002 57.78 6.99002 59.61 8.43002 61.83C9.04002 62.77 10.06 63.36 11.18 63.36H508.68C509.8 63.36 510.82 62.77 511.43 61.83C512.87 59.62 514.83 57.78 517.12 56.5C518.17 55.91 518.86 54.84 518.86 53.64V10.72C518.86 9.52 518.17 8.45 517.12 7.86C514.83 6.58 512.87 4.75001 511.43 2.53001C510.82 1.59001 509.8 1 508.68 1H11.18C10.06 1 9.04002 1.59001 8.43002 2.53001Z" stroke="#00211A" strokeWidth="2"></path>
                                </svg>

                                <input 
                                    type="email" 
                                    ref={inputRef}
                                    placeholder="ENTER EMAIL ADDRESS" 
                                    required 
                                    onChange={(e) => setEmail(e.target.value)} />
                                <button 
                                    onClick={(e) => {e.preventDefault();
                                        new mutate({
                                        'email': email,
                                    })}
                                }>
                                    <ion-icon name="arrow-forward-outline"></ion-icon>
                                </button>
                            </div>
                        </form>
                    </div>
            </div>

            <div>
                <div className='footer'>
                    <div>
                        <div>
                            <h1>Have any questions or suggestions?</h1>
                            <p> Reach out to us on any of our social media handles
                                and we'll get back to you as soon as possible
                            </p>
                            <ul>
                                <a href=""><li><ion-icon name="logo-facebook"></ion-icon></li></a>
                                <a href=""><li><ion-icon name="logo-instagram"></ion-icon></li></a>
                                <a href=""><li><ion-icon name="logo-twitter"></ion-icon></li></a>
                            </ul>
                            <p>Don't forget to follow us too!!</p>
                        </div>
                    </div>

                    <div>
                        <h1>Our menu</h1>
                        <ul>
                            <a href="">
                                <li>Cakes</li>
                            </a>
                            <a href="">
                                <li>Cup cakes</li>
                            </a>
                            <a href="">
                                <li>Pasteries</li>
                            </a>
                            <a href="">
                                <li>Cookies</li>
                            </a>
                            <a href="">
                                <li>Finger food</li>
                            </a>
                        </ul>
                    </div>

                    <div>
                        <h1>Learn</h1>
                        <ul>
                            <a href="">
                                <li>What we stand for</li>
                            </a>
                            <a href="">
                                <li>Community</li>
                            </a>
                    
                            <a href="">
                                <li>Contact Us</li>
                            </a>
                            <a href="">
                                <li>About us</li>
                            </a>
                        </ul>
                    </div>

                    <div>
                        <h1>How can we help</h1>
                        <ul>
                            <a href="">
                                <li>Privacy Policy</li>
                            </a>
                            <a href="">
                                <li>Accessibility</li>
                            </a>
                            <a href="">
                                <li>Terms & conditions</li>
                            </a>
                        </ul>
                    </div>
                </div>
                <div>NENE'S DELICACY &#169; 2022, ALL RIGHTS RESERVED</div>
            </div>
        </footer>
     );
}

export default Footer;