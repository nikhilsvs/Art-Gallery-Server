const mongoose = require('mongoose');
var Gallery = require('./gallery');
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    
    admin:{
        type:Boolean,
        default:false
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    artist:{
        type:Boolean,
        default:false
    },
    galleries:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Gallery'
        }]
    
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);;