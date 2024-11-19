const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb'); 
const jwt = require('jsonwebtoken');

const secret_key = 'fas';

var user_id ;


module.exports = {


    buyer_home: (req , res) => {
        res.send("buyer_home_page");
        
    },
       // buyer manipulation
       get_all_sellers_data : async (req , res) => {
        

        try {
            const get_all_users = await Users_import.seller_post.find();
            if(get_all_users)
            {
                return res.status(200).json(get_all_users);
            }
            else {
                return res.status(200).json({message : 'There is no user in new collection'});
            }
        } catch (error) {
            return res.status(500).json({message: 'Internet error'});
        }
    },
    
    
    buyer_sign_in :async (req , res) =>{
        const {buyer_email , buyer_password  } = req.body;
    try {
        const add_data_in_buyer_collection = await Users_import.buyer_collection.findOne({buyer_email ,buyer_password});

        if(add_data_in_buyer_collection)
        {
            return res.status(200).json(add_data_in_buyer_collection);
        }
        
        else {
            return res.status(400).json({message : 'Login credentials of buyer doesnot exists'})
        }
    } catch (error) {
        console.log('damnnnnn');
        return res.status(500).json({message : 'Server error'})
    }
        
    }
    

,

    add_user_in_buyer_collection :async (req , res) =>{
        const {email , password  } = req.body;
    try {
        const add_data_in_buyer_collection = await Users_import.buyer_collection.create({email , password});

        if(add_data_in_buyer_collection)
        {
            return res.status(200).json({message : 'Data successfully added in buyer collection'})
        }
        
        else {
            return res.status(400).json({message : 'Data couldnot be added in buyer collection'})
        }
    } catch (error) {
        console.log('damnnnnn');
        return res.status(500).json({message : 'Server error'})
    }
        
    }
    ,
    get_filtered_data: async (req, res) => {
        const { product_type } = req.body; 
    
        if (!product_type || !Array.isArray(product_type)) {
            return res.status(400).json({ message: 'Invalid product_type format. Expected an array.' });
        }
    
        try {
            
            const check_client_query = await Users_import.seller_post.find({
                product_type: { $in: product_type.map(option => new RegExp(option, 'i')) }
            });
    
          
            if (!check_client_query.length) {
                return res.status(404).json({ message: 'No matching products found.' });
            }
    
        
            return res.status(200).json(check_client_query);
    
        } catch (error) {
        
            console.error('Error fetching filtered data:', error);
            return res.status(500).json({ message: 'Server error while fetching data.' });
        }
    }
    
    

    
}