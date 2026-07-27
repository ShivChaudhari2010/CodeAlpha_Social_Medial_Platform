import User from "../models/User.js";
import Post from "../models/Post.js";

// ==========================================
// Get My Profile
// ==========================================

export const getMyProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      profile: {
        ...user.toObject(),
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },
    });

  } catch (error) {

    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });

  }
};


// ==========================================
// Update Profile
// ==========================================

export const updateProfile = async (req, res) => {
  try {

    const { username, bio } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check duplicate username
    if (username && username !== user.username) {

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
        });
      }

      user.username = username.trim();
    }

    if (bio !== undefined) {
      user.bio = bio.trim();
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {

    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });

  }
};


// ==========================================
// Get My Posts
// ==========================================

export const getMyPosts = async (req, res) => {
  try {

    const posts = await Post.find({
      author: req.user._id,
    })
      .populate("author", "username profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });

  } catch (error) {

    console.error("Get My Posts Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });

  }
};