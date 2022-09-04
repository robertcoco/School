const { MongoServerError } = require("mongodb")
const { User } = require("../../models/user")
const { School } = require("../../models/school")
const { Student } = require("../../models/student")
const { renamePropertyOfObj } = require("../../utils/helpers")

module.exports = { 
    user: async ({ id }, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const user = await User.get(id)
            if(!user) {
                throw new Error("User not found, error 404")
            }
            
            renamePropertyOfObj(user, "_id", "id")
            delete user.password
            return user
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    school: async ({ id }) => {
        try {
            const school = await School.get(id)

            if(!school) {
                throw new Error("school not found, error 404")
            }

            renamePropertyOfObj(school, "_id", "id")
            return school
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    student: async ({ id }, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const student = await Student.get(id, ctx.loginData.schoolID)

            if(!student) {
                throw new Error("student not found, error 404")
            }

            renamePropertyOfObj(student, "_id", "id")
            return student
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    students: async (args, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const students = await Student.getAll(ctx.loginData.schoolID)
            students.forEach((student) => renamePropertyOfObj(student, "_id", "id"))
            return students
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
};