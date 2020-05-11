const User = require("../../models/user");

const addUser = async ({ userInput }) => {
  try {
    // check if there user exists already
    const isThereUserWithMail = await User.findOne({
      email: userInput.email,
    });

    if (isThereUserWithMail) {
      throw new Error("There is already user with that email.");
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    const newUser = new User({
      name: userInput.name,
      email: userInput.email,
      password: hashedPassword,
      sex: userInput.sex,
    });

    const result = await newUser.save();
    return { ...result._doc, password: null, _id: result.id };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = addUser;
