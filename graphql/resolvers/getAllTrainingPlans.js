const TrainingPlan = require("../../models/trainingPlan");

const getAllTrainingPlans = async () => {
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
};

module.exports = getAllTrainingPlans;
