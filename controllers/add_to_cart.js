const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb'); 
// const jwt = require('jsonwebtoken');

// const secret_key = 'fas';

// var user_id ;


module.exports = {

    add_to_cart_data: async (req, res) => {
        console.log('--- Incoming Request ---');
        console.log('Request Body:', req.body);
    
        const { 
            buyer_unique_id, 
            product_name, 
            seller_name, 
            product_price, 
            warranty, 
            product_image 
        } = req.body;
    
        // Log extracted fields to ensure they are being parsed correctly
        console.log('Parsed Fields:');
        console.log('Buyer Unique ID:', buyer_unique_id || 'Undefined');
        console.log('Product Name:', product_name || 'Undefined');
        console.log('Seller Name:', seller_name || 'Undefined');
        console.log('Product Price:', product_price || 'Undefined');
        console.log('Warranty:', warranty || 'Undefined');
        console.log('Product Image:', product_image || 'Undefined');
    
        // Check if any required field is missing
        if (!buyer_unique_id || !product_name || !seller_name || !product_price || !warranty || !product_image) {
            console.log('Validation Failed: Missing required fields');
            return res.status(400).json({ message: "Missing required fields" });
        }
    
        try {
            console.log('Attempting to add data to MongoDB...');
            const user = await Users_import.add_to_cart(
                buyer_unique_id, 
                product_name, 
                seller_name, 
                product_price, 
                warranty, 
                product_image
            );
    
            if (user) {
                console.log('Data successfully added to MongoDB:', user);
                return res.status(200).json({ message: "You added the product" });
            } else {
                console.log('Data insertion failed: add_to_cart returned false or null');
                return res.status(400).json({ message: "Data could not be added" });
            }
        } catch (error) {
            // Log the error with a stack trace
            console.error('Error in add_to_cart_data:', error.stack || error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    

}