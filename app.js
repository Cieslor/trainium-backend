if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

// graphQL setup
const schema = require("./graphql/schema");
const rootResolver = require("./graphql/resolvers");

app.use(
  "/graphql",
  graphqlHttp({
    schema: schema,
    rootValue: rootResolver,
    graphiql: true,
  })
);

// mongoDB connection

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@trainium-cluster-vnpdy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // declaring on which port app will listen when successful connection to DB

    app.listen(process.env.PORT || 3000);
    console.log(
      `Connected to mongoDB. App listens at port ${process.env.PORT}.`
    );
  })
  .catch((error) => {
    console.log(error);
  });
