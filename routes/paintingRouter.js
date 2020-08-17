const express = require('express');
const mongoose = require('mongoose');
const cors = require('./cors');
const authenticate = require('../Authenticate');
const bodyParser = require('body-parser');
const Paintings = require('../models/paintings');


const paintingRouter = express.Router();

paintingRouter.use(bodyParser.json());

paintingRouter.route('/')
.get(cors.cors,(req,res,next)=>{
    Paintings.find({})
    .populate('artist')
    .populate('gallery')
    .then((items)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(items);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = paintingRouter;