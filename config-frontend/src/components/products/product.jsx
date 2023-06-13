import { useEffect, useState } from 'react';
import axios from 'axios'
import './product.scss'

const Product = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        document.title = "Nene's Delicacy | Cakes";

        axios.get('http://127.0.0.1:8000/api/products?type=FF')
        .then(response => {
            setProduct(response.data)
        })

        console.log(products)

    }, [])

    return (
        <section className='product'>
            <div>
                <div>
                    <ul className="links">
                        <li><a href="">Our products</a></li>
                        <li><ion-icon name="chevron-forward-outline"></ion-icon></li>
                        <li>Cakes</li>
                    </ul>
                    <div className='banner-text'>
                        <h1>Cakes</h1>
                        <div>
                            Our cakes bring layers of joy (and rich buttercream frosting) to any occasion,
                            with flavors for every type of sweets-lover. From classics to limited-time creations,
                            all of our beautifully decorated cakes are made the old-fashioned way: from scratch and with love.
                        </div>
                    </div>
                </div>
                <div>
                    <img src="images/cake.jpg" alt="colorful cake" srcSet="" />
                </div>
            </div>

            <div className="products">
                {products.map(product => (
                    <div>
                        <div className='image-wrapper'>
                            <img src={product.image} alt="" />
                        </div>
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Product;