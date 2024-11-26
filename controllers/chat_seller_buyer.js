const Users_import = require('../models/model.js');
const { ObjectId } = require('mongodb');

// The `make_chat_db` function checks and creates or fetches an existing chat.
module.exports = {
  hello: async (req, res) => {
    console.log('hello');
    res.status(200).send({ message: "Hello World!" });
  },

  // Endpoint to check if the chat exists or not
  check_chat_exists: async (req, res) => {
    const { sender_id, buyer_id } = req.params;

    try {
      // Generate the unique chat ID using both sender and buyer IDs
      const chatId = `${sender_id}_${buyer_id}`;

      // Search for an existing chat by its ID
      const existingChat = await Users_import.chat.findById(chatId);

      if (existingChat) {
        // If chat exists, return the chat data
        return res.status(200).send({
          success: true,
          message: "Chat already exists.",
          data: existingChat  // Send the existing chat messages and other details
        });
      } else {
        // If the chat doesn't exist
        return res.status(404).send({
          success: false,
          message: "Chat does not exist."
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ success: false, error: "Something went wrong." });
    }
  },

  // Endpoint to create a new chat if none exists
  make_chat_db: async (req, res) => {
    const { sender_id, buyer_id, message, sent_by } = req.body;  // `sent_by` is the person sending the message

    try {
      console.log(`Sender ID: ${sender_id}, Sent By: ${sent_by}, Buyer ID: ${buyer_id}`);

      // Create a unique chat ID using both sender_id and buyer_id
      const chatId = `${sender_id}_${buyer_id}`;

      // Step 1: Check if the chat already exists
      const existingChat = await Users_import.chat.findById(chatId);

      if (existingChat) {
        // If chat exists, return a message that chat already exists
        return res.status(200).send({
          success: true,
          message: "Chat already exists.",
          data: existingChat  // Send existing chat data, such as messages, sender, buyer, etc.
        });
      } else {
        // Step 2: If chat doesn't exist, create a new chat with the initial message
        console.log('Creating new chat...');
        const newMessage = {
          message: message,
          sent_by: sent_by,  // Include who is sending the message
        };

        // Create a new chat entry in the database
        const newChat = new Users_import.chat({
          _id: chatId,
          sender_id: sender_id,  // Store sender's ID
          buyer_id: buyer_id,    // Store buyer's ID
          messages: [newMessage],  // Store the new message
        });

        // Save the new chat to the database
        await newChat.save();

        console.log("New chat created with message.");
        return res.status(200).send({
          success: true,
          message: "New chat created with first message.",
          data: newChat  // Send the newly created chat data (can include message, sender, buyer, etc.)
        });
      }

    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        success: false,
        error: "Something went wrong."
      });
    }
  }
};
