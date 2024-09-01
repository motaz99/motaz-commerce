const MainProductsFilter = require('../models/MainProductsFilter');
const Products = require('../models/Products');
const SubProductFilter = require('../models/SubProductsFilter');

const createMainFilter = async (req, res) => {
  const { name } = req.body;
  try {
    const createdFilter = await MainProductsFilter.create({
      name,
    });

    res.status(201).json(createdFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMainFilters = async (req, res) => {
  try {
    const allMainFilters = await MainProductsFilter.find();
    if (allMainFilters.length === 0) {
      throw new Error('No main filters yet');
    }
    res
      .status(200)
      .json({ message: 'All main filters received', data: allMainFilters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const getFilterById = async (req, res) => {
//   const productId = req.params.id;

//   try {
//     const product = await Products.findById(productId);

//     if (!product) {
//       throw new Error('Product not found');
//     }

//     res.status(200).json({ message: 'Product by ID received', data: product });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const updateMainFilter = async (req, res) => {
  const mainFilterId = req.params.id;
  const { name } = req.body;

  try {
    const updatedMainFilter = await MainProductsFilter.findByIdAndUpdate(
      mainFilterId,
      { name },
      { new: true }
    );

    if (!updatedMainFilter) {
      throw new Error('Main filter not found');
    }

    res.status(200).json({
      message: 'Main filter updated successfully',
      data: updatedMainFilter,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMainFilter = async (req, res) => {
  const mainFilterId = req.params.id;

  try {
    const isMainFilterUsed = await Products.exists({ mainFilterId });

    if (isMainFilterUsed) {
      throw new Error(
        'Cannot delete the main filter as it is used in some products'
      );
    }

    const mainFilter = await MainProductsFilter.findByIdAndDelete(mainFilterId);

    if (!mainFilter) {
      throw new Error('Main filter not found');
    }

    await SubProductFilter.deleteMany({ mainFilterId });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMainFilter,
  updateMainFilter,
  getAllMainFilters,
  deleteMainFilter,
};
