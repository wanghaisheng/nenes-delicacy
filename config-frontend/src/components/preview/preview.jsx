import './preview.scss';
import { useSelector } from 'react-redux';
import { placeHolder } from '../../utils';
import { useEffect, useState} from 'react';

const Preview = () => {

    const shippingInfo = useSelector((state) => state.getShipping)
    const [shipping, setShipping] = useState(placeHolder)
    console.log(shippingInfo, shipping)

    useEffect(() => {

        if (shippingInfo) {
            setShipping(shippingInfo)
        }

    }, [shippingInfo])


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
                            <li>Contacts:</li>
                            <li>{shipping.email} <br/>{shipping.phone}</li>
                        </ul>
                        <li>Change</li>
                    </ul>
                    <ul>
                        <ul>
                            <li>Ship to: </li>
                            <li>{shipping.address}</li>
                        </ul>
                        <li>Change</li>
                    </ul>
                </div>
     );
}

export default Preview;