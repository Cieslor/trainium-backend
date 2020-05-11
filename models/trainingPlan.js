const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trainingPlanSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
});

trainingPlanSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("TrainingPlan", trainingPlanSchema);
