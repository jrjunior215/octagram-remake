const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const expressSession = require('express-session');
const multer = require('multer');
const dbConnection = require('./js/database');
const paypal = require('paypal-rest-sdk');

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
const creatorRegController = require('./controllers/views/home/creatorRegController');

// Views Controller Creator Page
const creatorController = require('./controllers/views/creator/creatorController');
const postChooseController = require('./controllers/views/creator/postChooseController');
const postTextController = require('./controllers/views/creator/postTextController');
const postImageController = require('./controllers/views/creator/postImageController');
const packageController = require('./controllers/views/creator/packageController');
const packagePageController = require('./controllers/package/packagePageController');
const packageCreateController = require('./controllers/package/packageCreateController');

// Search Controller
const searchAutoCreatorController = require('./controllers/search/searchAutoCreatorController');
const creatorPageController = require('./controllers/search/creatorPageController');

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
const creatorUserController = require('./controllers/creator/creatorUserController');
const imagePostController = require('./controllers/upload/post/imagePostController');

//PROFILE
const ProfileUpdateController = require('./controllers/user/ProfileUpdateController');

const checkoutCreatorController = require('./controllers/checkout/checkoutCreatorController');

const paypalController = require('./controllers/checkout/paypalController');


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

paypal.configure({
  'mode': 'sandbox',
  'client_id': 'AVJ6mtFBreT1lVa-vxp-XDi6j-5EyLLNzywpRJ3ECLCVChiNbytq5OewOfHMX3a1W4xOraTdyYF5scPr',
  'client_secret': 'EHj6li2g7QMf2RHr3SZ-Q8RrE4kE6xbdNGlcwX4nQwBGR_Zd7JYY1-b0clpdMrkVVuvFxo69obB9Pi5n'
})

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
app.get('/creator', creatorRegController);

// CREATOR PAGE
app.get('/post/create', postChooseController);
app.get('/post/text', postTextController);
app.get('/post/image', postImageController);
app.get('/package/create', packagePageController);
app.get('/:pname/home', creatorController);
app.get('/:pname/package', packageController);

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

// REGISTER CREATOR
app.post('/user/creator', creatorUserController);

// CREATOR MEMBERSHIP
app.post('/membership/prefer', memberAddController)

// POST CREATE

// TEXT POST
app.post('/text/create', textPostController);

// IMAGE POST 

const storage = multer.diskStorage({
  destination: './img/post',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
  
});

const upload = multer({ storage });

app.post('/image/create', upload.single('image'), imagePostController);

// PROFILE
app.post('/profile/update', ProfileUpdateController);

// PACKAGE CREATE
app.post('/package/create', packageCreateController);

// Checkout Package
app.post('/checkout/:pname/:package_id', checkoutCreatorController);

app.post('/create-payment', paypalController);

app.get('/success', (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  const executePaymentJson = {
    payer_id: payerId,
  };
  
  paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.redirect('/home');
      res.json(payment);
    }
  });
});

// SET POST LISTEN
app.listen(4000, () => console.log("Server is Running on Port 4000."));