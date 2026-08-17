
const getCurrentUserProfile = async (req, res) => {
  try {
   
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      createdAt: req.user.createdAt
    });
  } catch (error) {
    console.error("Get Current User Profile Error:", error.message);
    return res.status(500).json({ message: "Server error while fetching profile" });
  }
};

module.exports = {
  getCurrentUserProfile
};
