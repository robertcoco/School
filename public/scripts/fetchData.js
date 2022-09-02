function fetchData(query) {
    return fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        query: query
    })
  })
  .then(res => res.json())
  }
