const mongoose = require('mongoose');

const Schema = mongoose.Schema

const feedbackSchema=new Schema({
    name:{type:String,requires:true},
    foodName:{type:String, requires: true},
    ratings : {type:String,required:true},
    review:{type:String ,default:'Not Given'}
},{timestamps:true})

 

module.exports = mongoose.model('Feedback',feedbackSchema);