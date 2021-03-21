const homeController = require('../appback/http/controllers/homeController');
const authController = require('../appback/http/controllers/authController');
const cartController = require('../appback/http/controllers/customersController/cartController');
const guest = require('../appback/http/middleware/guest')


function initRoutes(app){
    
app.get('/',homeController().index)

app.get('/login',guest,authController().login)
app.post('/login',authController().postLogin)

app.get('/register',guest,authController().register)
app.post('/register',authController().postRegister)

app.post('/logout',authController().logout);

app.get('/cart',cartController().cart)
app.post('/update-cart',cartController().update)

}

module.exports = initRoutes;