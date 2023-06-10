import './product.scss'

const Product = () => {
    return (
        <section className='product'>
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
                <img src="images/cake.jpg" alt="colorful cake" srcset="" />
            </div>
        </section>
    );
}

export default Product;