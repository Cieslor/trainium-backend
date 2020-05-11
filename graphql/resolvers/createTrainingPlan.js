const TrainingPlan = require("../../models/trainingPlan");

const createTrainingPlan = async ({ trainingPlanInput }) => {
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
};

module.exports = createTrainingPlan;
