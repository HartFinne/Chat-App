import User from "../models/user.model.js"; // Import the User model
import Message from "../models/message.model.js"; // Import the Message model
import cloudinary from "../lib/cloudinary.js";

// 📌 Get a list of users for the sidebar (excluding the logged-in user)
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // Get the logged-in user's ID

    // Fetch all users except the logged-in user, excluding passwords for security
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers); // Send the filtered users as JSON response
  } catch (error) {
    console.error("Error in getUsersForSidebar", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Return an error response
  }
};

// 📌 Get all messages exchanged between the logged-in user and another user
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // Get the ID of the user to chat with from request params
    const myId = req.user._id; // Get the logged-in user's ID

    // Fetch messages where the logged-in user is either the sender or receiver
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId }, // Messages sent by me to the other user
        { senderId: userToChatId, receiverId: myId }, // Messages sent by the other user to me
      ],
    });

    res.status(200).json(messages); // Return the chat messages as JSON
  } catch (error) {
    console.log("Error in getMessages controller", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Handle any errors
  }
};

// 📌 Send message to another user
export const sendMessage = async (req, res) => {
  try {
    // 📌 Extract text and image from the request body
    const { text, image } = req.body;

    // 📌 Extract the receiver's ID from request parameters
    const { id: receiverId } = req.params;

    // 📌 Get the sender's ID from the authenticated user
    const senderId = req.user._id;

    let imageUrl;

    // 📌 If an image is provided, upload it to Cloudinary and get the secure URL
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url; // Get the uploaded image URL
    }

    // 📌 Create a new message instance with sender, receiver, text, and optional image
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl, // Save the uploaded image URL (if any)
    });

    // 📌 Save the new message to the database
    await newMessage.save();

    // 📌 TODO: Implement real-time messaging functionality using Socket.io
    // This will notify the receiver in real-time when a new message arrives.

    res.status(201).json(newMessage); // Send success response
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal Server Error" }); // Handle any errors
  }
};
