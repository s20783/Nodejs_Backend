var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var klubyRouter = require('./routes/klubyRoute');
var zawodnicyRouter = require('./routes/zawodnicyRoute');
var klub_zawodnikRouter = require('./routes/klub_zawodnikRoute');
var meczeRouter = require('./routes/meczeRoute');
var sezonyRouter = require('./routes/sezonyRoute');
var authApiRouter = require('./routes/AuthApiRoute');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const session = require('express-session');
app.use(session({
  secret: 'p09',
  resave: false
}));

app.use((req,res,next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if(!res.locals.loginError){
    res.locals.loginError = undefined;
  }
  next();
});

const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
  directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
  objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
  cookie: 'liga-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o
});
app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
    const currentLang = req.cookies['liga-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use(cors());
app.use('/', indexRouter);
app.use('/kluby', klubyRouter);
app.use('/zawodnicy', zawodnicyRouter);
app.use('/klub_zawodnik', klub_zawodnikRouter);
app.use('/wyniki', meczeRouter);
app.use('/sezony', sezonyRouter);
app.use('/api/auth', authApiRouter);


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
