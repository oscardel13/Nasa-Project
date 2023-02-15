const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router')
const historyRouter = require('./history/history.router');

const api = express.Router();

api.use('/planets',planetsRouter);
api.use('/launches', launchesRouter)
api.use('/history', historyRouter)

module.exports = api;