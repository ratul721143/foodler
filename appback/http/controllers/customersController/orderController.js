const Order = require('../../../models/ordermodel')
const moment = require('moment');
function orderController(){
    return{
        store(req,res){
            //Validate request
            const { phone,address } = req.body;

            if(!phone || !address){
                req.flash('error','All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId : req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })

            order.save().then(result=>{
                req.flash('success','ordered Place successfully');
                delete req.session.cart;
                return res.redirect('/customers/orders');
            }).catch(err=>{
                req.flash('error','something went wrong! Please try again');
                return res.redirect('/cart');
            })

        },
        async index(req,res){
            const orders = await Order.find({ customerId: req.user._id },null,{sort:{'createdAt': -1 }})
            res.header('Cache-Control','no-cache,private,no-store,must-revalidate,max-scale=0,post-check=0,pre-check=0')
            res.render('customers/orders',{orders:orders,moment:moment});
            
        }
    }
}


module.exports = orderController;