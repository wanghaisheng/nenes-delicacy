import './footer.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCcMastercard, faCcVisa} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {

    library.add(fas , faCcMastercard, faCcVisa)

    return ( 
        <footer>
            <div  className='footer'>
                <div>
                    <h1>Have any questions or suggestions?</h1>
                    <p> Reach out to us on any of our social media handles. <br/>
                        and we'll get back to you as soon as possible
                    </p>
                    

                    <ul>
                        <a href=""><li><ion-icon name="logo-facebook"></ion-icon></li></a>
                        <a href=""><li><ion-icon name="logo-instagram"></ion-icon></li></a>
                        <a href=""><li><ion-icon name="logo-twitter"></ion-icon></li></a>
                    </ul>

                    <p>Don't forget to follow us too!!</p>
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
        </footer>
     );
}

export default Footer;