const orders = require('../../../models/ordermodel')

function AdminOrdersStatusController(){
    return{
        updateStatus(req,res){
            
            orders.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                if(err){
                    return res.redirect('/admin/orders');
                }
                return res.redirect('/admin/orders');
            })     
           
        }
    }
}

module.exports = AdminOrdersStatusController;