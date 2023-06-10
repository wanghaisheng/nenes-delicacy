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
                    <h1>KEEP IN TOUCH!</h1>
                    <p>Have any questions or suggestions? <br/>
                       reach out to us on any of our social media handles.</p>

                    <ul>
                        <a href=""><li><ion-icon name="logo-facebook"></ion-icon></li></a>
                        <a href=""><li><ion-icon name="logo-instagram"></ion-icon></li></a>
                        <a href=""><li><ion-icon name="logo-twitter"></ion-icon></li></a>
                    </ul>

                    <p>and we'll get back to you as soon as possible</p>
                </div>

                <div className='logo'>
                    <img src="images/logo.png" alt="nene's delicacy logo" />
                </div>

                <div>
                    <p>Kindly note that we accept only the following debit and credit cards</p>
                    <ul>
                        <li><FontAwesomeIcon icon="fa-brands fa-cc-mastercard" /></li>
                        <li><FontAwesomeIcon icon="fa-brands fa-cc-visa" /></li>
                    </ul>

                    <div>
                        <p>TERMS OF SERVICE</p>
                        <p>PRIVACY POLICY</p>
                    </div>
                </div>
            </div>

            <div>&#169; NENE'S DELICACY, INC</div>
        </footer>
     );
}

export default Footer;