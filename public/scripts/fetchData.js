async function fetchData(query) {
    const fetched = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            "Authorization": `Bearer ${localStorage.jwt}`
        },
        body: JSON.stringify({
            query: query
        })
    })

    const response = await fetched.json()
    if(!response) throw new Error("Null Response, check url API");
    return response
}
