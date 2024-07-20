import { useSelector } from 'react-redux'
import './preloader.scss'
import '../cart/cart.scss'


const Spinner = (props) => {
    return (
        <div className='loading'>
            <div>
                <div className='image-holder'>
                    <img src="/icons/spinner-trans-bg.gif" alt="" />
                </div>
                <pre>{props.message}</pre>
            </div>
        </div> 
    )
}


const Error = (props) => {
    return (
        <div className="error">
            <pre>
                <div>
                    <ion-icon name="alert-circle-outline"></ion-icon>
                </div>

                <div>
                    {props.message}<br />
                    Please try again
                </div>

                <div>
                    <button onClick={() => props.refetch()}>
                        <pre>Try again</pre>
                    </button>
                </div>

            </pre>
        </div>
    )
}


export { Spinner, Error };