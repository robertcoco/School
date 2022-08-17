const { MongoServerError } = require("mongodb")
const { User } = require("../../models/user")
const { Student } = require("../../models/student")
const { renamePropertyOfObj } = require("../../utils/helpers")
const bcrypt = require("bcrypt")

module.exports = { 
    login: async ({ username, password }) => {
        try {
            const user = await User.findBy({name: username})
            if(!user) throw new Error("Incorrect username");
            
            const res = bcrypt.compare(password, user.password)
            if(!res) throw new Error("Incorrect password");
            
            renamePropertyOfObj(user, "_id", "id")
            delete password
            return user
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    createStudent: async ({ input }) => {
        try {
            const defaultData = {
                direction: ""
            }

            const res = await Student.create({...defaultData, ...input})
            if(!res) {
                throw new Error("Student could not be created because of BadRequest")
            }

            const student = {
                ...defaultData,
                ...input,
                id: res.insertedId
            }
            console.log(student)
            return student
        } catch(err) {
            if(err instanceof MongoServerError) {
                console.log(err)
                throw new Error("Server Error 500: server could not access the data")
            }

            throw err;
        }
    },
    updateStudent: async ({ id, input }) => {
        try {
            const res = await Student.update(id, input)
            if(!res || res.modifiedCount < 1) {
                throw new Error("Student could not be updated because of BadRequest (not modified data were passed)")
            }

            const student = await Student.get(id)
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
    deleteStudent: async ({ id }) => {
        try {
            const student = await Student.get(id)
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