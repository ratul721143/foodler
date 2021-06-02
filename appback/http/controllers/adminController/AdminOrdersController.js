const order = require('../../../models/ordermodel');

function AdminOrdersController(){
    return{
        index(req,res){
            order.find({status:{$ne : 'completed'}},null,{sort:{'createdAt': -1 }})
            .populate('customerId','-password').exec((err,customersOrders)=>{
                if(req.xhr){ // if it is an ajax call
                    return res.json(customersOrders);
                }
                else{
                   return res.render('admin/adminorders');
                }
            })
        }
    }
}

module.exports = AdminOrdersController;