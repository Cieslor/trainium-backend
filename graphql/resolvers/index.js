const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const TrainingPlan = require("../../models/trainingPlan");

//resolvers
const getAllUsers = require("./getAllUsers");
const getAllTrainingPlans = require("./getAllTrainingPlans");
const addUser = require("./addUser");
const createTrainingPlan = require("./createTrainingPlan");

const rootResolver = {
  getAllUsers: getAllUsers,
  getAllTrainingPlans: getAllTrainingPlans,
  addUser: addUser,
  createTrainingPlan: createTrainingPlan,
};

module.exports = rootResolver;
