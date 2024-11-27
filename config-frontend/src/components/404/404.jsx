const NotFound = () => {
    return (
        <section className="404" style={{color: 'black'}}>
            <div style={{
                padding:'80px 0', 
                background: '#bae8d4', 
                textAlign: 'center', 
                fontWeight: 'bold', 
                fontSize: 'clamp(20px, 8vw, 40px)'
                }}>
                404 Not Found
            </div>
            <div style={{padding: '20px', maxWidth: '70em'}}>
                <p>Sorry but the page you're looking for doesn't exist.</p>
                <p> Please visit our homepage to learn more, or our product page to explore 
                    all of our tasty treats. If you would like to contact us, please email 
                    us at neneesdelicacy@gmail.com and we will do our best to assist you.
                </p>
            </div>
        </section>
    );
}

export default NotFound;