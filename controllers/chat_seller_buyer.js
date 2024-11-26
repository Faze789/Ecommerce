const Users_import = require('../models/model.js');  // Import your MongoDB model
const { ObjectId } = require('mongodb');  // Import MongoDB's ObjectId, though not necessary if you're using a string ID format

module.exports = {
  hello: async (req, res) => {
    console.log('hello');
    res.status(200).send({ message: "Hello World!" });
  },

  check_id_exists: async (req, res) => {
    const { seller_id, buyer_id } = req.body;

    try {
     
      const combined_id = `${seller_id}_${buyer_id}`;


      const check_exists_chat = await Users_import.chat.findOne({_id: combined_id});

      if (check_exists_chat) {
      
        return res.status(200).json({ exists: true, chat: check_exists_chat });
      } else {
        // If no chat found, return false
        return res.status(404).json({ exists: false, message: 'Chat not found' });
      }
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
