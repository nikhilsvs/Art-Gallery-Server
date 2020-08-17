const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paintingSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    gallery:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Gallery'
    }    
},{
    timestamps:true
});

const Paintings = mongoose.model('Paintings',paintingSchema);

module.exports = Paintings;