const express = require('express');
const usersRouter = require('./users.router');
const equipmentsRouter = require('./equipments.router');
const scheduleRouter = require('./schedule.router');
const loginRouter = require('./login.router');
function routerApi(app) {
    const router = express.Router();
    app.use('', router);
    router.use('/users', usersRouter);
    router.use('/equipments', equipmentsRouter);
    router.use('/schedule', scheduleRouter);
    router.use('/login', loginRouter);
}

module.exports = routerApi;
