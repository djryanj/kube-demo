// var appzip = require('appmetrics-zipkin') ({
//     host: '192.168.2.50',
//     port: 9411,
//     serviceName:'backend',
//     sampleRate: 1.0
//   });
var createError = require('http-errors');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser')
var logger = require('morgan');

const app = express();
app.use(express.static('public'));
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
