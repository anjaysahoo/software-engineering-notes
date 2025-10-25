import { useState, useCallback, useEffect } from 'react';

const GridLight = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [isReversing, setIsReversing] = useState(false);

  const handleBoxClick = useCallback((index) => {
    if (isReversing || selectedBoxes.includes(index)) return;
    
    const newSelectedBoxes = [...selectedBoxes, index];
    setSelectedBoxes(newSelectedBoxes);

    if (newSelectedBoxes.length === 8) {
      setIsReversing(true);
    }
  }, [selectedBoxes, isReversing]);

  useEffect(() => {
    if (isReversing && selectedBoxes.length > 0) {
      const timer = setTimeout(() => {
        setSelectedBoxes(prev => prev.slice(0, -1));
      }, 300);

      if (selectedBoxes.length === 1) {
        setIsReversing(false);
      }

      return () => clearTimeout(timer);
    }
  }, [isReversing, selectedBoxes]);

  const renderBox = (index) => {
    if (index === 4) return null; // Center box
    
    const isSelected = selectedBoxes.includes(index);
    return (
      <div
        key={index}
        className={`grid-light__box ${isSelected ? 'grid-light__box--active' : ''}`}
        onClick={() => handleBoxClick(index)}
      />
    );
  };

  return (
    <div className="grid-light">
      <div className="grid-light__container">
        {Array(9).fill(null).map((_, index) => renderBox(index))}
      </div>
    </div>
  );
};

export default GridLight; 