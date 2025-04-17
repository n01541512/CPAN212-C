const Product = require('../models/product_model');

exports.getAllProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: { $regex: req.query.keyword, $options: 'i' }
        }
      : {};

    const products = await Product.find({ ...keyword });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load products' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

exports.createProduct = async (req, res) => {
  const sampleProduct = new Product({
    name: 'Sample Product',
    brand: 'Sample Brand',
    category: 'electronics',
    description: 'This is a sample product.',
    price: 0,
    countInStock: 0,
    image: '/images/sample.jpg',
    user: req.user._id
  });

  try {
    const createdProduct = await sampleProduct.save();
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.countInStock = countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product' });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
