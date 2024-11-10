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


module.exports =  {seller_post ,User , buyer_collection };























