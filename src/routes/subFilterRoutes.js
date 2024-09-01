const express = require('express');

const router = express.Router();
const subFilter = require('../controllers/subProductsFilterControllers');

router.get('/', subFilter.getAllSubFilters);
router.post('/', subFilter.createSubFilter);
router.put('/:id', subFilter.updateSubFilter);
router.delete('/:id', subFilter.deleteSubFilter);

module.exports = router;
