const { MongoServerError, ObjectId } = require("mongodb")
const { User } = require("../../models/user")
const { Student } = require("../../models/student")
const { renamePropertyOfObj } = require("../../utils/helpers")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../../config")

module.exports = { 
    login: async ({ input: { username, password } }) => {
        try {
            const user = await User.findBy({name: username})
            if(!user) throw new Error("Incorrect username");
            
            const res = await bcrypt.compare(password, user.password)
            if(!res) throw new Error("Incorrect password");
            const jwtPayload = {
                userID: user._id,
                schoolID: user.school
            }
            
            const signedToken = jwt.sign(jwtPayload, config.secretKey)
            return {token: signedToken}
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    createStudent: async ({ input }, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const defaultData = {
                direction: ""
            }

            const inputData = {...defaultData, ...input}
            inputData.school = new ObjectId(ctx.loginData.schoolID)
            
            const res = await Student.create(inputData)
            if(!res) {
                throw new Error("Student could not be created because of BadRequest")
            }

            const student = {
                ...inputData,
                id: res.insertedId
            }
            return student
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    updateStudent: async ({ id, input }, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const res = await Student.update(id, input)
            if(!res || res.modifiedCount < 1) {
                throw new Error("Student could not be updated because of BadRequest (not modified data were passed)")
            }

            const student = await Student.get(id, ctx.loginData.schoolID)
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
    deleteStudent: async ({ id }, ctx) => {
        if(!ctx.isAuthen) throw new Error("Error 401: Unauthenticated user");

        try {
            const student = await Student.get(id, ctx.loginData.schoolID)
            if(!student) throw new Error("404 Student not found");
            
            const res = await Student.delete(id)
            if(!res || res.deletedCount < 1) {
                throw new Error("Student could not be deleted because of BadRequest error")
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
};