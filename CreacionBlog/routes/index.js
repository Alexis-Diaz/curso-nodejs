const express = require('express');
const controller = require('../controllers/index');

const indexRouter = express.Router()

indexRouter.get('/', controller.renderIndex);

module.exports = indexRouter