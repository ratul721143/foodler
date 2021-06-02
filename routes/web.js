const homeController = require('../appback/http/controllers/homeController');
const authController = require('../appback/http/controllers/authController');
const cartController = require('../appback/http/controllers/customersController/cartController');
const orderController = require('../appback/http/controllers/customersController/orderController')
const feedbackController = require('../appback/http/controllers/feedbackController');
const AdminOrdersController = require('../appback/http/controllers/adminController/AdminOrdersController');


const guest = require('../appback/http/middleware/guest');
const auth = require('../appback/http/middleware/auth');
const admin = require('../appback/http/middleware/admin');

function initRoutes(app){
    
app.get('/',homeController().index)

app.get('/login',guest,authController().login)
app.post('/login',authController().postLogin)

app.get('/register',guest,authController().register)
app.post('/register',authController().postRegister)

app.post('/logout',authController().logout);

app.get('/cart',cartController().cart)
app.post('/update-cart',cartController().update)
app.post('/increase-qty',cartController().increaseQty)
app.post('/decrease-qty',cartController().decreaseQty)

//customer routes
app.post('/orders',auth,orderController().store)
app.get('/customers/orders',auth,orderController().index);

//feedback route
app.get('/feedback',feedbackController().feedback)
app.post('/feedback',feedbackController().postfeedback)

//admin routes
app.get('/admin/orders',admin,AdminOrdersController().index);


}

module.exports = initRoutes;