const { GraphQLError, Kind, GraphQLScalarType } = require("graphql")
const DATE_REGEX = new RegExp("^\d{2}\/\d{2}\/(\d{2}|\d{4})$|^\d{2}-\d{2}-(\d{2}|\d{4})$")

const GraphQLDate = new GraphQLScalarType({
    name: "Date",
    description: "A valid date dd-mm-yyyy format",
    serialize: (value) => {
        if(!(value instanceof Date) || isNaN(value)) {
            throw new GraphQLError(`Value is not a valid date: ${value}`)
        }

        return value
    },
    parseValue: (value) =>  {
        if(!DATE_REGEX.test(value)) {
            throw new GraphQLError(`Value is not a valid date format: ${value}`)
        }

        return new Date(value)
    },
    parseLiteral: (ast) => {
        if (ast.kind === Kind.STRING) {
            return  ast.value
        }
    
        throw new GraphQLError(`Value is not a string: ${ast.value}`)
    }
})


module.exports = GraphQLDate