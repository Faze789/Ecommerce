const Users_import = require('../models/model.js')

const path = require('path');
const { ObjectId } = require('mongodb');


module.exports = {

  make_chat_db: async (req, res) => {
    const { sender_id, buyer_id , message } = req.body;

    try {
   
      const chatId = `${sender_id}_${buyer_id}`;

    
      const existingChat = await Users_import.chat_with_seller_and_buyer.findById(chatId);
      if (!existingChat) {
    
        const newChat = new Users_import.chat_with_seller_and_buyer.create({
          _id: chatId,
          messages: [], 
        });
        await newChat.save();
      }

      res.status(200).send({ success: true, message: "Chat created or exists." });
    } catch (error) {
      res.status(500).send({ success: false, error: "Something went wrong." });
    }
  },
};