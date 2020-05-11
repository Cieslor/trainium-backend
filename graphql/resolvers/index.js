const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const TrainingPlan = require("../../models/trainingPlan");

const rootResolver = {
  getAllUsers: async () => {
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
  },
  getAllTrainingPlans: async () => {
    try {
      const trainings = await TrainingPlan.find();
      return trainings.map((training) => {
        return {
          ...training._doc,
          _id: training.id,
        };
      });
    } catch (error) {
      throw error;
    }
  },
  addUser: async ({ userInput }) => {
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
  },
  createTrainingPlan: async ({ trainingPlanInput }) => {
    try {
      const newTrainingPlan = new TrainingPlan({
        title: trainingPlanInput.title,
        createdBy: trainingPlanInput.createdBy,
      });

      const result = await newTrainingPlan.save();
      const user = await User.findById(trainingPlanInput.createdBy);
      await user.trainingPlans.push(newTrainingPlan);
      await user.save();
      return {
        ...result._doc,
        _id: result.id,
      };
    } catch (error) {
      throw error;
    }
  },
};

module.exports = rootResolver;
