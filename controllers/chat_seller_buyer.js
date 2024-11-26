const Users_import = require('../models/model.js');
const path = require('path');
const { ObjectId } = require('mongodb');

// The `make_chat_db` function creates or checks for the existence of a chat. 
module.exports = {
  make_chat_db: async (req, res) => {
    const { sender_id, buyer_id, message } = req.body;

    try {
      console.log(sender_id, buyer_id, message);
      const chatId = `${sender_id}_${buyer_id}`;

      const newChat = new Users_import.chat({
        _id: chatId,
        messages: [message],
      });

      await newChat.save();

      res.status(200).send({ success: true, message: "Chat created or exists." });
    } catch (error) {
      res.status(500).send({ success: false, error: "Something went wrong." });
    }
  },
};