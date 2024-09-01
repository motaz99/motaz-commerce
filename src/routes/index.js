const express = require('express');
const authRoutes = require('./authRoutes');
const productsRoutes = require('./productsRoutes');
const verifyUser = require('../middlewares/verifyUser');

const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/products', verifyUser, productsRoutes);

module.exports = routes;
