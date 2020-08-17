var express = require('express');
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exhibitionSchema = new Schema({
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
        type:String,
        required:true
    }    
},{
    timestamps:true
});


var Exhibitions = mongoose.model('exhibition',exhibitionSchema);

module.exports = Exhibitions;