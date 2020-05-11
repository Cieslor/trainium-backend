const { buildSchema } = require("graphql");

const schema = buildSchema(`
type Query {
    getAllUsers: [User!]!
    getAllTrainingPlans: [TrainingPlan!]!
}

type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    sex: String!
    trainingPlans: [TrainingPlan!]
}

type TrainingPlan {
  _id: ID!
  title: String!
  createdBy: User!
}

input UserInput {
    name: String!
    email: String!
    password: String!
    sex: String!
}

input TrainingPlanInput {
  title: String!
  createdBy: String!
}

type Mutation {
    addUser(userInput: UserInput):User
    createTrainingPlan(trainingPlanInput: TrainingPlanInput):TrainingPlan
}

schema {
    query: Query
    mutation: Mutation
}
`);

module.exports = schema;
