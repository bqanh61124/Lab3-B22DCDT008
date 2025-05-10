const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();
const User = require("../db/userModel");

router.post("/", async (request, response) => {
  
});

router.get("/", async (request, response) => {
  
});

// Get photos of a specific user with comments
router.get("/photosOfUser/:id", async (req, res) => {
  try {
    // Verify user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Get photos for the user
    const photos = await Photo.find({ user_id: req.params.id })
      .populate({
        path: "comments.user_id",
        select: "_id first_name last_name"
      });

    // Transform the data to match the required format
    const formattedPhotos = photos.map(photo => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map(comment => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: {
          _id: comment.user_id._id,
          first_name: comment.user_id.first_name,
          last_name: comment.user_id.last_name
        }
      }))
    }));

    res.json(formattedPhotos);
  } catch (err) {
    res.status(400).json({ error: "Error fetching photos" });
  }
});

module.exports = router;
