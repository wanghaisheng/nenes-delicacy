import './preloader.scss'
import '../cart/cart.scss'
import { defaultOptions } from '../../utils';
import Lottie from 'react-lottie';
import spinner from '../../lotties/spinner';


const Spinner = (props) => {

    return (
        <div className='loading'>
            <div>
                <Lottie 
                    options={{
                        ...defaultOptions,
                        animationData: spinner
                    }}
                    height={50}
                    width={50}
                />
                <pre>{props.message}</pre>
            </div>
        </div> 
    )
}


const Error = (props) => {
    console.log(props)
    return (
        <div className="error">
            <div>
                <div>
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </div>

                <div>
                    <pre>
                        {props.message}<br />
                        Please try again
                    </pre>
                </div>
                
                <div>
                    <button onClick={() => props.refetch()}>
                        <pre>Try again</pre>
                    </button>
                </div>
                
            </div>
        </div>
    )
}


export { Spinner, Error };