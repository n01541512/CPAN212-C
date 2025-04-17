import React from 'react';

const ProductFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="filters p-4 border rounded">
      <h4 className="font-bold mb-2">Filter</h4>

      <label className="block mb-1">
        Category:
        <select name="category" onChange={handleChange}>
          <option value="">All</option>
          <option value="laptops">Laptops</option>
          <option value="phones">Phones</option>
          <option value="accessories">Accessories</option>
        </select>
      </label>

      <label className="block mb-1">
        Max Price:
        <input type="number" name="maxPrice" onChange={handleChange} />
      </label>
    </div>
  );
};

export default ProductFilter;
