const Users_import = require('../models/model.js');
const path = require('path');
const { ObjectId } = require('mongodb');

// The `make_chat_db` function creates or checks for the existence of a chat.
module.exports = {

  make_chat_db: async (req, res) => {
    const { sender_id, buyer_id, message } = req.body;

    try {
      console.log(sender_id);
      console.log(buyer_id);
      const chatId = `${sender_id}_${buyer_id}`;

      

 
        const newChat = new Users_import.chat({
          _id: chatId,       // Custom chat ID
          messages: [message], // Initialize with the first message
        });

        await newChat.save(); // Save the new chat to the database
      

      // Send a success response if chat is created or exists
      res.status(200).send({ success: true, message: "Chat created or exists." });

    } catch (error) {
      // Send an error response if something goes wrong
      res.status(500).send({ success: false, error: "Something went wrong." });
    }
  },
};
