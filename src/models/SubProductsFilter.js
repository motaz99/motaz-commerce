const mongoose = require('mongoose');

const subProductsFilterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mainFilterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MainFilter',
    required: true,
  },
});

const SubProductFilter = mongoose.model(
  'SubProductFilter',
  subProductsFilterSchema
);

module.exports = SubProductFilter;
