const express = require("express")
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const GetGqlFile = require("../utils/getGqlFile")
const GraphQLDate = require("../resolvers/customScalars/date")
const queriesResolvers = require("../resolvers/queries")
const mutationsResolvers = require("../resolvers/mutations")

const router = express.Router()

var schema = buildSchema(GetGqlFile("mainSchema"));

var root = {
  Date: GraphQLDate,
  ...queriesResolvers,
  ...mutationsResolvers
};

router.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

module.exports = router