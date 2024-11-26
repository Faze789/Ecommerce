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
      
    },
    { strict: false } // This allows fields not defined in the schema
  );


  const add_to_cart = mongoose.model('add_to_cart_to_buyers', add_to_cart_to_to_buyer);

  const chat_seller_and_buyer = new mongoose.Schema(
    {
      _id: { type: String, required: true },  // Chat ID
      messages: [
        {
          message: { type: String, required: true },  // The content of the message
          sent_by: { type: String, required: true }   // The sender's ID
        }
      ]
    },
    { strict: false }  // Allow flexible fields
  );
  
  // Create the model
  const chat = mongoose.model('chats', chat_seller_and_buyer);


module.exports =  {seller_post ,User , buyer_collection , add_to_cart , chat};























