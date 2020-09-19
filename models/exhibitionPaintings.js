const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exhibitionPaintingSchema = new Schema({
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
    startingBid:{
        type:Number,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    exhibition:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'exhibition'
    }    
},{
    timestamps:true
});

const ExhibitionPaintings = mongoose.model('Paintings',paintingSchema);

module.exports = ExhibitionPaintings;