const express = require('express');

const planetsRouter = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router')
const historyRouter = require('./history/history.router');
const authRouter = require('./auth/auth.router');

const api = express.Router();

api.use('/planets',planetsRouter);
api.use('/launches', launchesRouter)
api.use('/history', historyRouter)
api.use('/auth', authRouter)

module.exports = api;