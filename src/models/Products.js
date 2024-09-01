const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  mainFilterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainProductsFilter',
    required: true,
  },
  subFilterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubProductFilter',
    required: true,
  },
  imageUrls: [
    {
      type: String,
      required: true,
    },
  ],
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
