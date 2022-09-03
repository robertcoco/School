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
                    id
                    name,
                    direction,
                    averageGrade
                }
            }
        `,
        create: `
            mutation: { 
                createStudent(input: ${JSON.stringify(payload)}) {
                    id
                    name
                }
            }  
        `,
        edit: ``,
        delete: ``,
    }
})

function GetFetchQueries(queryName, queryAction, payload = {}) {
    const state = queryState(payload)[queryName]
    if(!state instanceof Object) 
        throw new Error("The query state has not been declared");

    return state[queryAction];
}