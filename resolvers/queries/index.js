module.exports = { 
    getUser: () => ({
        id: "adasdsajdskajdsnka",
        name: "Albert",
        lastname: "Admin",
        password: "kslkjdaksdla",
        school: "sa156s6d5s465asds65a"
    }),
    getSchool: () => ({
        id: "5a6da5da6da1sd",
        name: "Aladin Highest",
        direction: "Another World",
        studentsQuantity: 35,
        logo: "some/day.jsml"
    }),
    getStudent: () => ({
        id: "2sa6d4ad54sa89",
        name: "Pablo",
        lastname: "Alberton Sazger",
        admissionDate: "15568",
        age: 25,
        averageGrade: 75.68,
        school: "65s56da8d6a"
    }),
    getAllStudents: () => ([
        {
            id: "2sa6d4ad54sa89",
            name: "Pavel",
            lastname: "Laragon Sazger",
            admissionDate: "15568",
            age: 16,
            averageGrade: 75.68,
            school: "65s56da8d6a"
        },
        {
            id: "2sa6d4ad54sa89",
            name: "Miguel",
            lastname: "Sazger Mateo",
            admissionDate: "15568",
            age: 20,
            averageGrade: 75.68,
            school: "65s56da8d6a"
        }
    ]),
};