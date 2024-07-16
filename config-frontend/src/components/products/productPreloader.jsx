import './productPreloader.scss'


const ProductPreloader = () => {

    window.scrollTo(0,0)
    
    return ( 
        <section className='skeleton-product'>
            <div>
                <div></div>
                <div></div>
            </div>

        <div className="skeleton-products">
            {[...Array(5)].map(x => (
                <div key={x}>
                    <div></div>
                    <div>
                        <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    </section>
     );
}

export default ProductPreloader;