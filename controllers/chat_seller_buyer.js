const Users_import = require('../models/model.js');
const path = require('path');
const { ObjectId } = require('mongodb');

// The `make_chat_db` function creates or checks for the existence of a chat. 
module.exports = {

hello: async (req, res) => {
  console.log('hello');
}
,
make_chat_db: async (req, res) => {
  const { sender_id, buyer_id, message, sent_by } = req.body;  // `sent_by` is the person sending the message

  try {
    console.log(sender_id, sent_by);  // Log sender and receiver ids

    // Create a unique chat ID using both sender_id and buyer_id
    const chatId = `${sender_id}_${buyer_id}`;

    // Look for the chat by ID first (check if chat already exists)
    const existingChat = await Users_import.chat.findById(chatId);

    if (existingChat) {
      // If the chat exists, return a message saying the chat already exists
      console.log("Chat already exists.");
      return res.status(200).send({ success: false, message: "Chat already exists." });
    } else {
      // If chat doesn't exist, create a new one with the initial message
      const newMessage = {
        message: message,
        sent_by: sent_by,  // Include the person who is sending the message
      };

      const newChat = new Users_import.chat({
        _id: chatId,
        messages: [newMessage],  // Store the new message
      });

      await newChat.save();
      console.log("New chat created with message.");
      return res.status(200).send({ success: true, message: "Chat created with first message." });
    }

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ success: false, error: "Something went wrong." });
  }
},

};