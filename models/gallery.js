var express = require('express');
var mongoose = require('mongoose');

const Schema = mongoose.Schema

const gallerySchema = new Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    paintings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Paintings'
    }]
});

var Gallery = mongoose.model('Gallery',gallerySchema);

module.exports = Gallery;