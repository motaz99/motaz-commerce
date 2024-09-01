const mongoose = require('mongoose');

const mainProductsFilterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const MainProductsFilter = mongoose.model(
  'MainFilter',
  mainProductsFilterSchema
);

module.exports = MainProductsFilter;
