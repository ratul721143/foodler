const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ordersSchema=new Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items: {type: Object , required:true },
    totalPrice:{type:String},
    phone: { type:String, required:true},
    address:{type:String,required:true},
    payment:{type:String,default:'COD'},
    status:{type:String,default:'order_placed'}
},{timestamps:true})


module.exports = mongoose.model('Order',ordersSchema);;