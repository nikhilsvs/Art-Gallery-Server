var express = require('express');
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exhibitionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    Paintings :[{
        type:mongoose.Schema.Types.ObjectId,
        Ref:'Paintings'
    }],
    Date:{
        type:Date
    }
},{
    timestamps:true
});


var Exhibitions = mongoose.model('exhibition',exhibitionSchema);

module.exports = Exhibitions;