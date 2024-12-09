const express = require('express');
const auth = require('../controllers/controll');
const buyer_auth = require('../controllers/buyer_controll');
const add_to_cart = require('../controllers/add_to_cart');
const chat = require('../controllers/chat_seller_buyer');



const router = express.Router();


router.get('/home', auth.home_page);
router.get('/damn', auth.damn);
router.get('/qatar', auth.qatar);
router.get('/home/get_all_users', auth.get_all_users);


router.post('/home/get_posts_by_unique_id', auth.get_unique_id);


router.post('/home/get_specific', auth.get_specific_user);
router.post('/home/signup_post_request', auth.signup_post);
router.post('/home/check_exists', auth.login_exists_or_add);

router.post('/home/check_exists/check_all_posts_of_specific_user', auth.check_all_posts_of_seller);

router.get('/home/check_exists/ad_post', auth.get_seller_ads);



router.post('/home/check_exists/new/seller_post', auth.login_exists_or_add);

router.post('/home/check_exists/new/seller_post/new_post', auth.add_new_post_in_seller_collection);


router.put('/home/sellers/seller_post_edit', auth.seller_change_fields_data);

router.delete('/home/seller/delete_unique_id_data' , auth.delete_specific_document);
// router.get('/home/show_posts_to_buyer', auth.show_posts_to_buyer);





//// buyer manipulation started

router.get('/buyer_home' , buyer_auth.buyer_home);



router.get('/home/buyer/get_all_sellers_data' , buyer_auth.get_all_sellers_data),
router.post('/home/buyer/buyer_sign_in' , buyer_auth.buyer_sign_in);

router.post('/home/buyer/buyer_get_unique_id' , buyer_auth.buyer_get_unique_id);


router.post('/home/buyer/add_new_buyer' , buyer_auth.add_user_in_buyer_collection);
router.post('/home/buyer/get_filtered_data' , buyer_auth.get_filtered_data);


/// buyer_add_to_cart

router.post('/buyer/add_to_cart' ,add_to_cart.add_to_cart_data);
router.post('/buyer/get_data_from_add_to_cart_by_unique_id' , add_to_cart.find_unique_id_in_add_to_cart_collection);
router.delete('/delete_data_from_store' ,add_to_cart.delete_product_from_store);



/// chat_with_seller_and_buyer


router.post('/chat_id_exists' , chat.check_id_exists);
// router.post('/check_chat_exists' , chat.check_chat_exists);
// router.post('/make_chat_db' , chat.make_chat_db);
router.get('/hello' , chat.hello);
// router.post('/find_chat_seller_and_buyer_using_their_unique_ids' , chat.find_same_unique_ids_both);

module.exports = router;