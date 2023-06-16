import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './product.scss'

const Product = () => {


    useEffect(() => {
        document.title = "Nene's Delicacy | Cakes";
    }, [])
    
    const products = useSelector(state => state.fetchAPI)

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