import React from 'react';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="quantity-selector flex items-center gap-2">
      <button onClick={decrease} className="px-2 py-1 border rounded">-</button>
      <span>{quantity}</span>
      <button onClick={increase} className="px-2 py-1 border rounded">+</button>
    </div>
  );
};

export default QuantitySelector;
