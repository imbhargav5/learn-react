import React from 'react';
import { useState } from 'react';

function Slider(props) {
    const { images } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const currentImage = images[currentImageIndex]
    return (
        <div>
            <div><img height="300" width="400" src={currentImage} /></div>
            <div><button>Prev</button><button>Next</button></div>
        </div>
    );
}

export default Slider;