const mongoose = require('mongoose');

const Schema = mongoose.Schema

const menuSchema=new Schema({
    name:{type:String,requires:true},
    image:{type:String,requires:true},
    price:{type:Number,requires:true}
    
})

const Menu = mongoose.model('Menu',menuSchema);

module.exports = Menu;