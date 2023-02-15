const express = require('express');

const { httpDeleteLaunch } = require('./history.controller')

const historyRouter = express.Router();

historyRouter.delete('/:id', httpDeleteLaunch)

module.exports = historyRouter;