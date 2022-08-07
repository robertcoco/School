const { GraphQLError, Kind, GraphQLScalarType } = require("graphql")

const GraphQLDate = new GraphQLScalarType({
    name: "Date",
    description: "A valid date dd-mm-yyyy format",
    serialize: (value) => value,
    parseValue: (value) => value,
    parseLiteral: (ast) => ast
})


module.exports = GraphQLDate