import React, { useState, useEffect } from 'react';
import './Rating.css';

const Rating = ({ 
    value, 
    emptyIcon = '/icons/stars/empty.svg',
    filledIcon = '/icons/stars/filled.svg',
    halfFilledIcon = '/icons/stars/half.svg',
    steps = 1 
}) => {
    const [rating, setRating] = useState(value);
    const [hoverRating, setHoverRating] = useState(null);
    const totalStars = 5;

    useEffect(() => {
        setRating(value);
    }, [value]);

    const isLessThanHalf = (event) => {
        const {target} = event;
        const boundingClientRect = target.getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));
        return mouseAt <= boundingClientRect.width / 2;
    };

    const handleClick = (index, event) => {
        const newRating = steps === 0.5 && isLessThanHalf(event) 
            ? index + 0.5 
            : index + 1;
        
        setRating(rating === newRating ? 0 : newRating);
    };

    const handleMouseMove = (index, event) => {
        const newHoverRating = steps === 0.5 && isLessThanHalf(event) 
            ? index + 0.5 
            : index + 1;
        setHoverRating(newHoverRating);
    };

    const handleMouseLeave = () => {
        setHoverRating(null);
    };

    const handleKeyDown = (event) => {
        const currentValue = rating || 0;

        switch(event.key) {
            case 'ArrowRight':
                setRating(Math.min(5, currentValue + steps));
                break;
            case 'ArrowLeft':
                setRating(Math.max(0, currentValue - steps));
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
                setRating(Number(event.key));
                break;
            default:
                break;
        }
    };

    const getIconSource = (index) => {
        const value = hoverRating !== null ? hoverRating : rating;
        
        if (!value) return emptyIcon;
        
        if (index + 1 <= value) return filledIcon;
        if (index + 0.5 === value) return halfFilledIcon;
        
        return emptyIcon;
    };

    return (
        <div
            tabIndex="0"
            className="star-rating"
            data-testid="star-rating-container"
            onKeyDown={handleKeyDown}
        >
            {[...Array(totalStars)].map((_, index) => (
                <img
                    key={index}
                    src={getIconSource(index)}
                    className="rating-image"
                    data-testid="rating-icon"
                    alt="Rate"
                    onClick={(e) => handleClick(index, e)}
                    onMouseMove={(e) => handleMouseMove(index, e)}
                    onMouseLeave={handleMouseLeave}
                />
            ))}
        </div>
    );
};

export default Rating;
