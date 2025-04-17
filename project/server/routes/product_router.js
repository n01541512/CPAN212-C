const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct, updateProduct,deleteProduct } = require('../components/product_controller');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
