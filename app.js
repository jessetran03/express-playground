const graphql = require("graphql");
const express = require('express');
const morgan = require('morgan');
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = graphql;
const { query } = require("./schema/queries");
const { mutation } = require("./schema/mutations");

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();
app.use(morgan('dev'));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
const port = 3000;

app.listen(port, () => {
  console.log(`GraphQL API server is listening on port ${port}!`);
})