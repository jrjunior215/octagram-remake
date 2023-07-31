const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');

global.loggedIn = null

//------------ Controller ------------

// Views Controller
const indexController = require('./controllers/views/indexController');
const loginController = require('./controllers/views/loginController');
const regController = require('./controllers/views/regController');

// Auth Controller
const regUserController = require('./controllers/auth/regUserController');
const loginUserController = require('./controllers/auth/loginUserController');

//------------ Controller ------------

//------------ Middleware ------------

//------------ Middleware ------------

const app = express();

// COOKIE SESSION
app.use(expressSession({
    secret: "node secret"
}));

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
});

// EXPRESS LAYOUTS
app.use(expressLayouts);
app.set('layout', './layouts/layout');

//SET PAGE LAYOUT
app.use((req, res, next) => {
    res.locals.layout = 'layouts/layout';
    next();
});

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// SET STATIC FILE
app.use("/css", express.static('css'));
app.use("/img", express.static('img'));
app.use("/lib", express.static('lib'));
app.use("/js", express.static('js'));
app.use("/fonts", express.static('fonts'));
app.use("/icon", express.static('fonts/font-awesome-4.7.0/css/font-awesome.min.css'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// SET VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

//------------ GET ------------

// INDEX PAGE
app.get('/', indexController);

// AUTH PAGE
app.get('/login', loginController);
app.get('/register', regController);

// HOME PAGE

//------------ POST ------------

// LOGIN & REGISTER
app.post('/user/register', regUserController);
app.post('/user/login', loginUserController);

// SET POST LISTEN
app.listen(4000, () => console.log("Server is Running on Port 4000."));