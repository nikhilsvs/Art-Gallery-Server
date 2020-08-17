const express = require('express');
const bodyParser = require('body-parser'); 
const authenticate = require('../authenticate');
const cors = require('./cors');
const mongoose = require('mongoose')
const Gallery = require('../models/gallery');
const Paintings = require('../models/paintings');


const galleryRouter = express.Router();
galleryRouter.use(bodyParser.json());

galleryRouter.route('/')
//.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.corsWithOptions,(req,res,next)=>{
   Gallery.find({})
   .populate('user')
   .populate('paintings')
    .then((items) => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(items);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    req.body.user = req.user._id
    Gallery.create(req.body)
        .then((item)=>{
            console.log("Gallery Created :",item);
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(item);
        },(err)=>next(err))
        .catch((err)=>next(err));
})
galleryRouter.route('/:gId')
.get(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Gallery.findById(req.params.gId)
    .then((item)=>{
        req.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(next))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end("NO POST REQUEST ON THIS END");
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Gallery.findById(req.params.gId)
    .then((item)=>{
        if(item.user === req.user._id)
        {
            findByIdAndUpdate(req.params.gId,{
                $set:req.body
            },{new:true})
            .then((item)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(item);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            res.statusCode = 403;
            res.end("You Cannot Modify this Painting")
        }
    })
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Paintings.findById(req.params.gId)
    .then((item)=>{
        if(item.user === req.user._id)
        {
            Paintings.findByIdAndRemove(req.params.gId)
            .then((item)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(item);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            res.statusCode = 403;
            res.end("You Cannot Delete This Gallery");
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
galleryRouter.route('/:gId/paintings')
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
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
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    req.body.artist = req.user._id;
    Paintings.create(req.body)
    .then((item)=>{
        Gallery.findById(req.params.gId)
        .then((gallery)=>{
            gallery.paintings.push(item._id);
            gallery.save();

        },(err)=>next(err))
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end("No Put Request on this route");
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end("No Delete Request on this route");
})
galleryRouter.route('/:gId/paintings/:pId')
.get(cors.cors,(req,res,next)=>{
    Paintings.findById(req.params.pId)
    .then((item)=>{
        req.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(next))
    .catch((err)=>next(err))
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end("NO POST REQUEST ON THIS END");
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Paintings.findById(req.params.pId)
    .then((item)=>{
        if(item.artist === req.user._id)
        {
            findByIdAndUpdate(req.params.pId,{
                $set:req.body
            },{new:true})
            .then((item)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(item);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            res.statusCode = 403;
            res.end("You Cannot Modify this Painting")
        }
    })
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    Paintings.findById(req.params.pId)
    .then((item)=>{
        if(item.artist === req.user._id)
        {
            Paintings.findByIdAndRemove(req.params.eId)
            .then((item)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(item);
            },(err)=>next(err))
            .catch((err)=>next(err))
        }
        else{
            res.statusCode = 403;
            res.end("You Cannot Delete This Painting");
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = galleryRouter;