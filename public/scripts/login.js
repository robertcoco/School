const form = document.getElementById('loginForm')
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const query = GetFetchQueries('user', 'login', {
        username: formData.get('username'),
        password: formData.get('password')
    });

    console.log(query);

    const {data , err} = await fetchData(query);
    if(err)  {
        alert("incorrect username or password");
        console.error(err);
    }
    else {
        localStorage.setItem("jwt", data.login.token);
        document.cookie = `jwt=${data.login.token}; expires=Thu, 18 Dec 2113 12:00:00 UTC`;
        window.location.href= "http://localhost:3000";
    }


    // window.location.href = window.location.href.replace("login", "home")
})