const express = require('express');

const router = express.Router();
const mainFilter = require('../controllers/mainProductsFilterControllers');

router.get('/', mainFilter.getAllMainFilters);
router.post('/', mainFilter.createMainFilter);
router.put('/:id', mainFilter.updateMainFilter);
router.delete('/:id', mainFilter.deleteMainFilter);

module.exports = router;
