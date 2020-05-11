const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  trainingPlans: [
    {
      type: Schema.Types.ObjectId,
      ref: "TrainingPlan",
      autopopulate: true,
    },
  ],
});

userSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("User", userSchema);
