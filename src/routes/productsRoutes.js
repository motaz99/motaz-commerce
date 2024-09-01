const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
const products = require('../controllers/productsControllers');

const mainFilter = require('./mainFilterRoutes');
const subFilter = require('./subFilterRoutes');

router.use('/main-filter', mainFilter);
router.use('/sub-filter', subFilter);
router.post('/', products.addProduct);
router.post(
  '/upload-product-image',
  upload.array('images', 5),
  products.uploadProductImagesToGoogleDrive
);
router.get('/', products.getAllProducts);
router.get('/:id', products.getProductById);
router.put('/:id', products.updateProduct);
router.delete('/:id', products.deleteProduct);

module.exports = router;
