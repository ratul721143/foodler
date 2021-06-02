const User = require('../../models/usermodel')
const fetch = require("node-fetch")
const bcrypt = require('bcrypt');
const passport = require('passport');


function authController(){
    //factory function - a function that return object
    return{
        
        login(req,res){
            res.render('auth/login');
        },

        postLogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.logIn(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect('/');
                })
            })(req,res,next)
        },
        logout(req,res){
            req.logout();
            
            return res.redirect('/');
        },

        register(req,res){
            res.render('auth/register');
        },
        postRegister(req,res){
            const {username,email,password} = req.body;
            
            // validate request
            if(!username || !email || !password){
                req.flash('error','All fields are required!');
                req.flash('name',username);
                req.flash('email',email);
                return res.redirect('/register');
            }
            // const key = process.env.MAILBOX_LAYER_API_KEY; 
            // //Check if email exists
            // let mailurl=`http://apilayer.net/api/check?access_key=${key}&email=${email}&smtp=1&format=1`;
            // fetch(mailurl)
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log(data);
            //         if(!data.format_valid){
            //           req.flash('invalidemail','Email is not valid');  
            //           return res.redirect('/');
            //         }
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     });

            User.exists({email: email},(err,result)=>{
                if(result){ //if email already exist inside database
                req.flash('error','Email already registered in an account!');
                req.flash('name',username);
                req.flash('email',email);
                return res.redirect('/register');
                }
            })

            //Hash password using bcript
            const hashedPassword = bcrypt.hashSync(password,10);


            //create new user
            const user = new User({
                username,
                email,
                password:hashedPassword
            })

            //store data in the database
            user.save().then((user)=>{
                //registration completed
                //Login automatically
                console.log(user);
                return res.redirect('/login');
            }).catch(err=>{
                console.log(err);
                req.flash('error','Something went wrong!');
                return res.redirect('/register');
            })

            
        }
        
    }

}

module.exports = authController;