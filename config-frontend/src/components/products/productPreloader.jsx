import './productPreloader.scss'


function ProductPreloader() {

    window.scrollTo(0,0)
    
    return ( 
        <section className='skeleton-product'>
            <div>
                <div></div>
                <div></div>
            </div>

        <div className="skeleton-products">
            <div>
                <div></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div>
                <div></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div>
                <div></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div>
                <div></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <div>
                <div></div>
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    </section>
     );
}

export default ProductPreloader;