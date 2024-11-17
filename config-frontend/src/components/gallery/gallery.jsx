import './gallery.scss';
import { imageCollage } from '../../utils';

const Gallery = () => {

    return (  
        <div className="image-collage-section">
            <div>
                <h1>No matter the size, be sure to tag us in your celebrations!</h1>
                <p>#nenesdelicacy</p>
            </div>
            
            <div className='image-collage'>
                {imageCollage.map((collage, index) => (
                    <div key={index}>
                        {collage.map(image => (
                            <span key={image.id}>
                                <img src={import.meta.env.VITE_CLOUD_URL + image.url} alt={image.title} loading='lazy'/>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;