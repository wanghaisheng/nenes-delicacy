import { useNavigate } from 'react-router-dom';
import './preview.scss';
import {useOutletContext } from 'react-router-dom';


const Preview = () => {

    const { shippingData } = useOutletContext();
    const navigate = useNavigate()

    return ( 
        <div className='preview'>
                    <ul>
                        <ul>
                            <li>Name:</li>
                            <li>{shippingData.data?.firstName} {shippingData.data?.lastName}</li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'name' } })}>Change</li>
                    </ul>
                    
                    <ul>
                        <ul>
                            <li>Contact:</li>
                            <li>{shippingData.data?.email} <br/>{shippingData.data?.phone}</li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'contact' } })}>Change</li>
                    </ul>

                    <ul>
                        <ul>
                            <li>Ship to:</li>
                            <li>{shippingData.data?.address} <br/>
                                {shippingData.data?.state}, {shippingData.data?.lga}
                            </li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'address' } })}>Change</li>
                    </ul>
                </div>
     );
}

export default Preview;