import { useNavigate } from 'react-router-dom';
import './preview.scss';
import { useSelector } from 'react-redux';

const Preview = () => {

    const shipping = useSelector((state) => state.getShipping)
    const navigate = useNavigate()

    return ( 
        <div className='preview'>
                    <ul>
                        <ul>
                            <li>Name:</li>
                            <li>{shipping.firstName} {shipping.lastName}</li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'name' } })}>Change</li>
                    </ul>
                    
                    <ul>
                        <ul>
                            <li>Contact:</li>
                            <li>{shipping.email} <br/>{shipping.phone}</li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'contact' } })}>Change</li>
                    </ul>

                    <ul>
                        <ul>
                            <li>Ship to:</li>
                            <li>{shipping.address}</li>
                        </ul>
                        <li onClick={() => navigate('/checkout', { state: { focus: 'address' } })}>Change</li>
                    </ul>
                </div>
     );
}

export default Preview;