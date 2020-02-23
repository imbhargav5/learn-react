import React from 'react';
import { useState } from 'react';

function Slider(props) {
    const { images } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function goToNextSlide() {
        if (currentImageIndex === images.length - 1) {
            return setCurrentImageIndex(0);
        }
        setCurrentImageIndex(Math.min(currentImageIndex + 1, images.length - 1))
    }

    function goToPrevSlide() {
        if (currentImageIndex === 0) {
            return setCurrentImageIndex(images.length - 1);
        }
        setCurrentImageIndex(Math.max(0, currentImageIndex - 1))
    }

    const currentImage = images[currentImageIndex]
    return (
        <div>
            <div><img height="300" width="400" src={currentImage} /></div>
            <div><button onClick={goToPrevSlide}>Prev</button>
                <button onClick={goToNextSlide}>Next</button></div>
        </div>
    );
}

export default Slider;