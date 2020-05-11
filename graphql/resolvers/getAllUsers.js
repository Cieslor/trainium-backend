const User = require("../../models/user");

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users.map((user) => {
      return {
        ...user._doc,
        _id: user.id,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = getAllUsers;
