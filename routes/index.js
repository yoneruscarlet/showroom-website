var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var isLoggedIn = require('../routes/user')
const {Router} = require("express");
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function (err,docs){
    var productChunks = [];
    var chunkSize = 3;
    for(var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    if(!req.isAuthenticated()) {
      res.render('shop/index', {title: 'Express', products: productChunks});
    } else {
      res.render('shop/logged-index', {title: 'Express', products: productChunks});
    }
  });
});
module.exports = router;
