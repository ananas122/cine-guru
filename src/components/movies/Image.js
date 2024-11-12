import React, { useState } from 'react';

// This component takes 'imageUrl' (the primary image source) and 'fallBackUrl' (the fallback image source) as props
const Image = ({ imageUrl, fallBackUrl }) => {

    // Initializing the state 'imageSrc' with the provided 'imageUrl'
    const [imageSrc, setImageSrc] = useState(imageUrl);

    // Function to handle the error when the image fails to load (e.g., broken URL)
    const handleImageError = () => {
        // If the image fails to load, set the image source to the fallback URL
        setImageSrc(fallBackUrl);
    }

    return (
        // Rendering the image with the 'imageSrc' as the source
        // If the image fails to load, 'handleImageError' will be triggered to update the image source
        <img src={imageSrc} onError={handleImageError} alt='Movie Cover' />
    );
}


export default Image;
