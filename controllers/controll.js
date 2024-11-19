const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb'); 
const jwt = require('jsonwebtoken');

const secret_key = 'fas';

var user_id ;


module.exports = {
    home_page: (req, res) => {
        res.send('Home page !!!');
        return console.log("Home page accessed");
    },
    damn: (req, res) => {
        res.send('i got damned !!!');
        return console.log("Home page accessed");
    },
    qatar: (req, res) => {
        res.send('i got damned !!!');
        return console.log("Welcome to Qatar");
    },
   
    get_all_users: async (req, res) => {
        try {
            const all_users = await Users_import.User.find();
            if (all_users && all_users.length > 0) {
                console.log(all_users);
                res.status(200).json(all_users);
            } else {
                res.status(404).json({ message: "No users found" });
            }
        } catch (error) {
            console.error("Error getting all users:", error);
            res.status(500).json({ message: "Server error while fetching users", error: error.message });
        }
    },
    
    get_specific_user: async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await Users_import.User.findOne({ email, password });
            if (user) {
                console.log('User found:', user);
    
                const user_id = user._id;  // Extract the user ID correctly
                console.log("User ID:", user_id);
    
                // Generate JWT token
                const token = jwt.sign({ email, password }, secret_key);
                
                console.log("Generated JWT Token:", token);
    
                // Return the user and token with a status code 200 (OK)
                return res.status(200).json({
                    user: user,  // Return user data
                    token: token ,// Return the JWT token
                    seller_id : user_id
                });
            } else {
                console.log('User not found');
                // Return a 404 status if the user is not found
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error('Error finding user:', error);
    
            // Ensure that a valid status code (500 for server error) is passed
            res.status(500).json({ message: "Server error", error: error.message });
        }
    },
    
    

    signup_post: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Users_import.User.create({ email, password });
            console.log(`User created: ${email}`);

            res.status(201).json(user);  // 201 for created
        } catch (error) {
            console.error('Error creating user:', error.message);
            res.status(400).json({ message: 'Error creating user', error: error.message });
        }
    },

    login_exists_or_add: async (req, res) => {
        const { email, password , seller__name } = req.body;

        try {
            const existingUser = await Users_import.User.findOne({ email, password  });
            if (existingUser) {
                return res.status(400).json({ message: "Login credentials already exist" });
            }

            const newUser = await Users_import.User.create({ email, password , seller__name });
            res.status(200).json(newUser);
        } catch (error) {
            console.error('Error in adding user:', error.message);
            res.status(500).json({ message: "Error in adding the user", error: error.message });
        }
    },
    get_seller_ads :async (req , res) => {
        const seller_ads_find = await Users_import.seller_post.findOne({user_id});
        if(user_id)
        {
            console.log("seller id is found " ,seller_ads_find);
            res.status(200).json({ message: "that seller id is found"})
        }
        else {
            res.status(400).json({ message: "that seller id is not found"})
        }
    }
  ,
    
  add_new_post_in_seller_collection: async (req, res) => {
   
    const { seller_product_id, seller_name, product_name, product_size, product_quality ,product_warranty , product_price, product_type, image_url } = req.body;


    console.log("Seller Product ID:", seller_product_id);
    console.log("Product Name:", product_name);
    console.log("seller name:", seller_name);
    console.log("Product Size:", product_size);
    console.log("Product Quality:", product_quality);
    console.log("Product warrantly:", product_warranty);
    console.log("Product price:", product_price);
    console.log("Product price:", product_type);
    console.log("Image URL:", image_url);

    try {
        const add_new_post_in_seller = await Users_import.seller_post.create({
            seller_product_id,
            product_name,
            seller_name,
            product_size,
            product_quality,
            product_warranty,
            product_price,
            product_type,
            image_url,
        });

        if (add_new_post_in_seller) {
            return res.status(200).json({ message: "Successfully added seller post" });
        } else {
            return res.status(400).json({ message: "Could not add seller post" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding seller post", error: error.message });
    }
}
,


        check_all_posts_of_seller: async (req, res) => {
        const { seller_id_in_seller_collection , seller_name } = req.body;
        console.log("got the seller idddddddd123456", seller_id_in_seller_collection);
        console.log("got the seller name", seller_name);
    
        try {
            
            const add_the_product_in_seller_collection = await Users_import.seller_post.find({ seller_product_id: seller_id_in_seller_collection });
    
            if (add_the_product_in_seller_collection) {
                console.log("successfully found all seller posts");
                return res.status(200).json(add_the_product_in_seller_collection);
            } else {
                return res.status(400).json({ message: "There is no seller post" });
            }
        } catch (error) {
            console.error("Error occurred:", error); 
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    },

    
    show_posts_to_buyer: async (req, res) => {


        // const { seller_id_for_buyer } = req.body;
    
        try {

            // const find_seller_posts_by_seller_id = await Users_import.seller_post.find({seller_id_for_buyer });

            const find_seller_posts_to_buyer = await Users_import.seller_post.find();
            
        
            if (find_seller_posts_to_buyer) {
                console.log('found that seller posts to show to buyer');
                return res.status(200).json(find_seller_posts_to_buyer);
            } else {
             
                return res.status(404).json({ message: 'No posts found for the given seller ID' });
            }
            
        } catch (error) {
        
            console.error('Error occurred while fetching posts:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    },
    delete_specific_document: async (req , res) =>
    {
        const {unique_id} = req.body;
        console.log(unique_id)

        try {

            const delete_unique_id = await Users_import.seller_post.deleteOne({_id : unique_id});
            
            if(delete_unique_id)
            {
                return res.status(200).json({ message: 'Document deleted successfully' });
            }
            else {
                return res.status(404).json({ message: 'Document not found' });
            }
        } catch (error) {
            console.error('Error deleting document:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
   ,
   

   seller_change_fields_data: async (req, res) => {
        console.log('got');
        const {unique_id ,...updatefields} = req.body; 

        console.log(unique_id);

        try {
            const edit_post = await Users_import.seller_post.findByIdAndUpdate(
                unique_id,
                {
                    $set : updatefields,

                },
                {
                    new : true,
                }
            );

            if (edit_post) {
                res.status(200).json({ message: 'Seller post updated successfully', edit_post });
            } else {
                res.status(404).json({ message: 'Seller post not found' });
            }
            
        } catch (error) {
            
        }
        
      
    }
,


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
            return res.status(200).json({message : 'Login credentials of buyer exists'})
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

