const { db } = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLID } = require("graphql");
const { UserType, ProjectType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  type: "Query",
  fields: {
    projects: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM project WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
    users: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM users WHERE id=$1`;
        const values = [args.id];

        return db
          .one(query, values)
          .then((res) => res)
          .catch((err) => err);
      },
    },
  },
});

exports.query = RootQuery;
