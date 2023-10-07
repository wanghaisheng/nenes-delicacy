import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from '../../utils';
import './product.scss';


const Product = () => {
    
    const [current, setCurrent] = useState([])
    const [products, setProducts] = useState([])
    const param = useParams()


    useEffect(() => {
    
        get('categories').then(res => {
            const result = res.find(type => type.parameter === param.type)
            setCurrent(result)
        })

    }, [])



    useEffect(() => {
        document.title = `${current.product_name} | Nene's Delicacy `;

        get('products').then(res => {
            const result = res.filter(product => product.product_type.id === current.id)
            setProducts(result)
    
        })

    }, [current])

    return (
        <section className='product'>
            <div>
                <div>
                    <ul className="links">
                        <li><a href="">Home</a></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>{current.product_name}</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>{current.product_name}</h1>
                        <div>{current.banner_text}</div>
                    </div>
                </div>
                <div><img src={current.banner_image} alt="colorful cake" srcSet="" /></div>
            </div>

            <div className="products">
                {products.map(product => (
                    <Link to={product.name} key={product.id}>
                        <div>
                            <div className='image-wrapper'>
                                <img src={product.image} alt="" />
                            </div>

                            <div>
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <div>
                                    <span className='naira'>
                                        <FontAwesomeIcon icon={faNairaSign} />
                                    </span>   
                                    <span>{Intl.NumberFormat("en-US").format(product.unit_price)}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Product;