const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock cannot be negative']
  },
  images: {
    type: [String],  
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

productSchema.index({ category: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
