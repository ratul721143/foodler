require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
//for genereting cookie
const session = require('express-session');
const flash = require('express-flash');
//for store cookie in mongodb we need connect-mongo
const MongodbStore = require('connect-mongo');

const passport = require('passport');


//Database connection
const url = 'mongodb://localhost/foodlerdb';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Database Connection failed');
});



let mongostore = new MongodbStore({
    mongoUrl: url
})


//Session config : session is a middleware
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongostore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));


//Passport config
const passportInit = require('./appback/config/passport')
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())



app.use(flash());


//Assets
app.use(express.static('public'));
//enable urlencoded
app.use(express.urlencoded({extended:false}));
//enable json
app.use(express.json());

//Global middleware
app.use((req,res,next)=>{
    res.locals.session = req.session; 
    res.locals.user = req.user
    next();
})


//set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//require routes
const rounters = require('./routes/web');
rounters(app);


app.listen(PORT, () => {
    console.log(`server has started at ${PORT}`);
});