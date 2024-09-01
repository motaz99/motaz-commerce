const decodeJwtToken = require('../helpers/decodeJwtToken');
const Products = require('../models/Products');
const googleDrive = require('../helpers/googleDrive');

const addProduct = async (req, res) => {
  const token = req.cookies.jwt;
  const decodedToken = decodeJwtToken(token);
  const { price, description, title, mainFilterId, subFilterId, imageUrls } =
    req.body;
  try {
    const savedProduct = await Products.create({
      userId: decodedToken.userId,
      title,
      description,
      price,
      mainFilterId,
      subFilterId,
      imageUrls,
    });

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadProductImagesToGoogleDrive = async (req, res) => {
  try {
    const authClient = await googleDrive.authorize();

    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => googleDrive.uploadFile(authClient, file))
    );
    const imageUrls = uploadedFiles.map((file) => file.url);
    res.json({
      message: 'Images successfully uploaded to Google Drive',
      imageUrls,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to upload images to Google Drive',
      message: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const query = {};

    if (req.query.mainFilterId) {
      query.mainFilterId = req.query.mainFilterId;
    }

    if (req.query.subFilterId) {
      query.subFilterId = req.query.subFilterId;
    }

    if (req.query.search) {
      query.title = { $regex: new RegExp(req.query.search, 'i') };
    }

    const allProducts = await Products.find(query);

    if (allProducts.length === 0) {
      throw new Error('No products found');
    }

    res.status(200).json({
      message: 'Received Products',
      data: allProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    res.status(200).json({ message: 'Product by ID received', data: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { title, description, price, mainFilterId, subFilterId } = req.body;

  try {
    if (mainFilterId && !subFilterId) {
      throw new Error(
        'You need a subFilterId in order to update the filter on a product'
      );
    }
    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { title, description, price, mainFilterId, subFilterId },
      { new: true }
    );

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findByIdAndDelete(productId);

    if (!product) {
      throw new Error('Product not found');
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
  uploadProductImagesToGoogleDrive,
};
