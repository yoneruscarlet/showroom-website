var express = require('express');
var router = express.Router();
var Product = require('../models/product');

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopping');

router.get('/user/update',isLoggedIn, function (req, res){
    console.log(req.headers);
    res.render('user/update-product');
});

router.post('/user/update', function (req,res,next){

    if(req.body.mot ==="1"){
        Product.findByIdAndUpdate(req.body.iproduct,{
            imagePath: req.body.imagePath,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        },function (err,docs) {});
    }
    if(req.body.mot ==="2"){
        Product.findByIdAndDelete(req.body.iproduct).exec();
    }
    res.redirect('/');
});


router.get('/user/insert',isLoggedIn, function (req, res){
    res.render('user/add-product');
});

router.post('/user/insert', function (req,res,next){
    var product = new Product({
        imagePath: req.body.imagePath,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    product.save();
    res.redirect('/')
});
var csrf = require('csurf');

var csrfProtection = csrf({cookie: true});
router.use(csrfProtection);

const passport = require("passport");

router.get('/user/profile',isLoggedIn,function (req,res,next){
    res.render('user/profile');
});

router.get('/user/signup',csrfProtection, function (req, res){
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(),messages: messages,hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));


router.get('/user/signin',notLoggedIn,csrfProtection, function (req, res){
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(),messages: messages,hasErrors: messages.length > 0});
});

router.post('/user/signin', passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

router.get('/user/signout',isLoggedIn, function (req, res, next){
    req.logOut();
    res.redirect('/');
});

router.get('/user/insert', function (req, res){
    var messages = req.flash('error');
    res.render('user/add-product');
});




module.exports = router;

function isLoggedIn(req, res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}