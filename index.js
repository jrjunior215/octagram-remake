const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const multer = require('multer');

//------------ Controller ------------

// Views Controller Index Page
const indexController = require('./controllers/views/index/indexController');
const loginController = require('./controllers/views/index/loginController');
const regController = require('./controllers/views/index/regController');

// Views Controller Home Page
const homeController = require('./controllers/views/home/homeController');
const searchController = require('./controllers/views/home/searchController');
const membershipController = require('./controllers/views/home/membershipController');
const settingController = require('./controllers/views/home/settingController');
const messageController = require('./controllers/views/home/messageController');

// Views Controller Creator Page
const creatorController = require('./controllers/views/creator/creatorController');
const postChooseController = require('./controllers/views/creator/postChooseController');
const postTextController = require('./controllers/views/creator/postTextController');
const postImageController = require('./controllers/views/creator/postImageController');

// Search Controller
const searchAutoCreatorController = require('./controllers/search/searchAutoCreatorController');
const creatorPageController = require('./controllers/search/creatorPageController')

// Auth Controller
const regUserController = require('./controllers/auth/regUserController');
const loginUserController = require('./controllers/auth/loginUserController');
const logoutUserController = require('./controllers/auth/logoutUserController');

// Member Controller
const memberAddController = require('./controllers/creator/memberAddController');
const memberListController = require('./controllers/creator/memberListController');

// Post Create

// TEXT
const textPostController = require('./controllers/upload/post/textPostController');



//------------ Controller ------------

//------------ Middleware ------------

// Auth Middleware
const redirectAuth = require('./middleware/redirectAuth');
const checkAuth = require('./middleware/checkAuth');

//------------ Middleware ------------


global.loggedIn = null

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
app.use("/img/icon.png", express.static('img/icon.png'));
app.use("/lib", express.static('lib'));
app.use("/js", express.static('js'));
app.use("/fonts", express.static('fonts'));
app.use("/icon", express.static('fonts/font-awesome-4.7.0/css/font-awesome.min.css'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SET VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//------------ GET ------------

// INDEX PAGE
app.get('/', redirectAuth, indexController);

// AUTH PAGE
app.get('/login', redirectAuth, loginController);
app.get('/register', redirectAuth, regController);
app.get('/logout', logoutUserController);

// HOME PAGE
app.get('/home', checkAuth, homeController);
app.get('/search', checkAuth, searchController);
app.get('/setting', checkAuth, settingController);
app.get('/message', checkAuth, messageController);

// CREATOR PAGE
app.get('/post/create', postChooseController);
app.get('/post/text', postTextController);
app.get('/post/image', postImageController);
app.get('/creator/:pname', creatorController);

// HOME SEARCH
app.get('/search/query', checkAuth, searchAutoCreatorController);
app.get('/:pname', checkAuth, creatorPageController);
app.get('/:pname/membership', checkAuth, membershipController);

// Navbar
app.get('/s/navbar', memberListController)

//------------ POST ------------

// LOGIN & REGISTER
app.post('/user/register', regUserController);
app.post('/user/login', loginUserController);

// CREATOR MEMBERSHIP
app.post('/membership/prefer', memberAddController)

// POST CREATE

// TEXT POST
app.post('/text/create', textPostController);

// SET POST LISTEN
app.listen(4000, () => console.log("Server is Running on Port 4000."));