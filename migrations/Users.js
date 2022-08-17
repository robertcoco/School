const { ObjectId } = require("mongodb")

module.exports = [
    {
        name: "UserTest1",
        password: "$2b$10$rHsOgThHnVU3qNBhWp4eseTISdBLbc8I2wnVJr7R2n5xKir9sldhe",
        school: new ObjectId("62f91bdb041380be3a63c389")
    },
    {
        name: "UserTest2",
        password: "$2b$10$rHsOgThHnVU3qNBhWp4eseTISdBLbc8I2wnVJr7R2n5xKir9sldhe",
        school: new ObjectId("62f91bdb041380be3a63c38a")
    },
    {
        name: "UserTest3",
        password: "$2b$10$rHsOgThHnVU3qNBhWp4eseTISdBLbc8I2wnVJr7R2n5xKir9sldhe",
        school: new ObjectId("62f91bdb041380be3a63c38b")
    }
]