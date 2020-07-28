const express = require('express');

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

const app = express();

app.use('/api/auth', authRoutes);
app.use('/api/analyticsRoutes', analyticsRoutes);
app.use('/api/categoryRoutes', categoryRoutes);
app.use('/api/orderRoutes', orderRoutes);
app.use('/api/positionRoutes', positionRoutes);

module.exports = app;
