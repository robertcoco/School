const queryState = (payload) => ({
    user: {
        login: `
            mutation { 
                login(input: {username: "${payload.username}", password: "${payload.password}"}) {
                    token
                }
            }
        `
    },
    student: {
        get: ``,
        getAll: `
            query 
            {
                students {
                    id,
                    name,
                    direction,
                    averageGrade,
                    admissionDate
                }
            }
        `,
        create: `
            mutation { 
                createStudent(input: {
                   name: "${payload.name}",
                   lastname: "${payload.lastName}",
                   age: ${payload.age},
                   admissionDate: "${payload.admissionDate}",
                   averageGrade: ${payload.averageGrade},
                   direction: "${payload.direction}"
                }) {
                    id
                    name
                }
            }  
        `,
        edit:   `
        mutation {
            updateStudent(id:"${payload.id}", input:{
                name: "${payload.name}",
                lastname: "${payload.lastName}",
                age: ${payload.age},
                admissionDate: "${payload.admissionDate}",
                averageGrade: ${payload.averageGrade},
                direction: "${payload.direction}",
              }
            ) {
            id
          }
        }
        `,
        delete: `
        mutation {
            deleteStudent(id:"${payload.id}"){
              name
            }
          }
        `
    }

})

function GetFetchQueries(queryName, queryAction, payload = {}) {
    const state = queryState(payload)[queryName]
    if(!state instanceof Object) 
        throw new Error("The query state has not been declared");

    return state[queryAction];
}