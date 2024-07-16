import './preview.scss';
import { useSelector } from 'react-redux';

const Preview = () => {

    const shipping = useSelector((state) => state.getShipping)

    return ( 
        <div className='preview'>
                    <ul>
                        <ul>
                            <li>Name:</li>
                            <li>{shipping.firstName} {shipping.lastName}</li>
                        </ul>
                        <li>Change</li>
                    </ul>
                    
                    <ul>
                        <ul>
                            <li>Contact:</li>
                            <li>{shipping.email} <br/>{shipping.phone}</li>
                        </ul>
                        <li>Change</li>
                    </ul>

                    <ul>
                        <ul>
                            <li>Ship to:</li>
                            <li>{shipping.address}</li>
                        </ul>
                        <li>Change</li>
                    </ul>
                </div>
     );
}

export default Preview;