import { useState, useEffect, useMemo } from "react";

const ImageCarousel = ({
                          images,
                          isAutoPlayOn = false,
                          duration = 3,
                          loop = true,
                      }) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set([0]));

    // Determine which images should be loaded
    const imagesToLoad = useMemo(() => {
        const indices = new Set([currIndex]);
        
        // Add prev image if it exists or if looping
        if (currIndex > 0 || loop) {
            indices.add((currIndex - 1 + images.length) % images.length);
        }
        
        // Add next image if it exists or if looping
        if (currIndex < images.length - 1 || loop) {
            indices.add((currIndex + 1) % images.length);
        }
        
        return indices;
    }, [currIndex, images.length, loop]);

    // Preload adjacent images
    useEffect(() => {
        imagesToLoad.forEach(index => {
            if (!loadedImages.has(index)) {
                const img = new Image();
                img.src = images[index].src;
                img.onload = () => {
                    setLoadedImages(prev => new Set([...prev, index]));
                };
            }
        });
    }, [imagesToLoad, images]);

    const trackStyle = {
        transform: `translateX(${-100 * currIndex}%)`,
    };

    return (
        <div className="image-carousel">
            <button
                className="image-carousel__button image-carousel__button--prev"
                onClick={() => {
                    const nextIndex = (currIndex - 1 + images.length) % images.length;
                    setCurrIndex(nextIndex);
                }}
                disabled={!loop && currIndex === 0}
            >
                Prev
            </button>

            <div className="image-carousel__track" style={trackStyle}>
                {images.map((image, index) => (
                    <div key={image.id} className="image-carousel__slide">
                        {loadedImages.has(index) ? (
                            <img
                                alt={image.alt}
                                src={image.src}
                                className="image-carousel__image"
                            />
                        ) : (
                            <div className="image-carousel__placeholder">
                                Loading...
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                className="image-carousel__button image-carousel__button--next"
                onClick={() => {
                    const nextIndex = (currIndex + 1) % images.length;
                    setCurrIndex(nextIndex);
                }}
                disabled={!loop && currIndex === images.length - 1}
            >
                Next
            </button>
        </div>
    );
};

export default ImageCarousel;
