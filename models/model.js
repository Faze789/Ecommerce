const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { ObjectId } = require('mongodb');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
},
{ strict: false },

);
const User = mongoose.model('User', userSchema);

//////

const sellerPostSchema = new mongoose.Schema({}, { strict: false });

const seller_post = mongoose.model("seller_posts" , sellerPostSchema)


/////
const buyer_schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
} , { strict: false }
);

const buyer_collection = mongoose.model('buyer_posts' , buyer_schema)



const add_to_cart_to_to_buyer = new mongoose.Schema(
    {
      // This can hold any field with any name, value can be of any type
      data: {
        type: mongoose.Schema.Types.Mixed, 
        required: true,
      },
    },
    { strict: false } // This allows fields not defined in the schema
  );

  const add_to_cart = mongoose.model('Add_to_cart_to_buyer', add_to_cart_to_to_buyer);


module.exports =  {seller_post ,User , buyer_collection , add_to_cart };























