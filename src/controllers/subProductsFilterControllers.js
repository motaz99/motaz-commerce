const SubProductsFilter = require('../models/SubProductsFilter');

const createSubFilter = async (req, res) => {
  const { name, mainFilterId } = req.body;
  try {
    const createdFilter = await SubProductsFilter.create({
      name,
      mainFilterId,
    });

    res.status(201).json(createdFilter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubFilters = async (req, res) => {
  try {
    const allSubFilters = await SubProductsFilter.find();
    if (allSubFilters.length === 0) {
      throw new Error('No sub filters yet');
    }
    res
      .status(200)
      .json({ message: 'All sub filters received', data: allSubFilters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSubFilter = async (req, res) => {
  const subFilterId = req.params.id;
  const { name } = req.body;

  try {
    const updatedSubFilter = await SubProductsFilter.findByIdAndUpdate(
      subFilterId,
      { name },
      { new: true }
    );

    if (!updatedSubFilter) {
      throw new Error('Sub filter not found');
    }

    res.status(200).json({
      message: 'Sub filter updated successfully',
      data: updatedSubFilter,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSubFilter = async (req, res) => {
  const subFilterId = req.params.id;

  try {
    const subFilter = await SubProductsFilter.findByIdAndDelete(subFilterId);

    if (!subFilter) {
      throw new Error('Sub filter not found');
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSubFilter,
  updateSubFilter,
  getAllSubFilters,
  deleteSubFilter,
};
