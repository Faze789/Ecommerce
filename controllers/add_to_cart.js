const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb'); 
// const jwt = require('jsonwebtoken');

// const secret_key = 'fas';

// var user_id ;


module.exports = {

    add_to_cart_data: async (req, res) => {
        const {  buyer_unique_id ,  product_name, seller_name, product_price , warranty, product_image  } =  req.body;

        console.log('Buyer Unique ID:', buyer_unique_id);
  console.log('Product Name:', product_name);
  console.log('Seller Name:', seller_name);
  console.log('Product Price:', product_price);
  console.log('Warranty:', warranty);
  console.log('Product Image:', product_image);

    }

}