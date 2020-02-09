const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const winston = require('./config/winston');

// Importing routes
const routes = require('./routes');
const serverStatus = require('./routes/status');

// Express setup
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream: winston.stream }));

// Using routes
app.use('/', routes);
app.use('/status', serverStatus);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Winston logging template
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
});

// Set port
const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`Server started on port: ${port}!`))

