const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb'); 
// const jwt = require('jsonwebtoken');

// const secret_key = 'fas';

// var user_id ;


module.exports = {

    add_to_cart_data: async (req, res) => {
        const { buyer_unique_id, product_name, seller_name, product_price, warranty, product_image } = req.body;
    
        console.log('--- Incoming Request Data ---');
        console.log('Buyer Unique ID:', buyer_unique_id);
        console.log('Product Name:', product_name);
        console.log('Seller Name:', seller_name);
        console.log('Product Price:', product_price);
        console.log('Warranty:', warranty);
        console.log('Product Image:', product_image);
    
        try {
            
         
    
            const user = await Users_import.add_to_cart.create(

                {
                buyer_unique_id, 
                product_name, 
                seller_name, 
                product_price, 
                warranty, 
                product_image
                }
            );
    
            if (user) {
                return res.status(200).json({ message: "Product added to cart" });
            } else {
                console.error('Database operation failed: Could not add product.');
                return res.status(400).json({ message: "Data could not be added" });
            }
        } catch (error) {
            console.error('Error in add_to_cart_data:', error.message);
            console.error('Stack Trace:', error.stack);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    } ,

    find_unique_id_in_add_to_cart_collection : async ( req , res)=>
    {
        const {buyer_unique_id} = req.body;

        
        try {
            const find_unique_id_in_add_to_cart = await Users_import.findOne({
                buyer_unique_id
            })

            if(find_unique_id_in_add_to_cart)
            {
                res.status(200).json({ message: "Unique ID found in add_to_cart"})
            }
            else {
                res.status(404).json({ message: "Unique ID couldnot be found in add_to_cart"});
            }
            
        } catch (error) {
            
        }
    }
    

}