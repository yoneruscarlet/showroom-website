var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');
var products = [
    new Product({
        imagePath:'https://www.eps.org/global_graphics/default-store-350x350.jpg',
        title: 'default-item',
        description: 'default-item',
        price: 0
    }),
];
var done = 0;
for (var i = 0; i< products.length; i++) {
    products[i].save(function(err, result){
        done++;
        if(done === products.length) {
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}