var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Exhibitions = require('../models/exhibition');
var passport = require('passport');
var passportLocal = require('passport-local');
var authenticate = require('../authenticate');
const cors = require('./cors');

const exhibitionRouter  = express.Router();
exhibitionRouter.use(bodyParser.json());



exhibitionRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Exhibitions.find({})
    .then((items)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(items);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req,res,next)=>{
    Exhibitions.create(req.body)
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end("No Put Request on this Route");
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    Exhibitions.remove({})
    .then((ans)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(ans);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
exhibitionRouter.route('/:eId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get((req,res,next)=>{
    Exhibitions.findById(req.params.eId)
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end("No Post Req At This Route");
})
.put((req,res,next)=>{
    Exhibitions.findByIdAndUpdate(req.params.eId,{
        $set:req.body
    },{new:true})
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    Exhibitions.findByIdAndRemove(req.params.eId)
    .then((item)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(item);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

exhibitionRouter.route('/:eId/paintings')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get((req,res,next)=>{
    Exhibitions.findById(req.params.eId)
    .then((item)=>{
        if(item != null)
        {
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(item.paintings);
        }
        else{
            err = new Error("Exhibition :"+ req.params.eId + " Not Found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Exhibitions.findById(req.params.eId)
    .then((item)=>{
        item.paintings.push(req.body);
        item.save()
        .then((item)=>{
            Exhibitions.findById(item._id)
            .then((item)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(item);
            },(err)=>next(err))
            
        },(err)=>next(err))
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put Operation Not Supported On Dishes/id/comments");
})
.delete((req,res,next)=>{
    Exhibitions.findById(req.params.eId)
   .then((item)=>{
    if(item != null){
               
        for(var i = (item.paintings.length -1) ;i>=0;i--)
        {
            item.paintings.id(item.paintings[i]._id).remove();
            item.save()
            .then((item)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(item.paintings);
            },(err)=>next(err))
        }
       
    }
    else{
        err = new Error("Dish "+ req.params.eId + " Not Found")
        err.status = 404;
        return next(err);
    }
   
   },(err)=>next(err))
   .catch((err)=>next(err));
});

module.exports = exhibitionRouter;