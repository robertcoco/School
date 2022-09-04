const students = document.querySelector('.students');
const login = document.getElementById("login");
login.innerHTML = "logout"; // TODO: ponerlo directamente en el html.

login.addEventListener("click", () => {
  document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  localStorage.removeItem("jwt");
})

const studentComponent = (data) =>(`
  <div class="card-body">
    <h4 class="card-title">${data.name}</h4>
    <p class="card-text">${data.direction}</p>
    <p id ='etiqueta'>${data.averageGrade}</p> 
    <input type = "hidden" class= "id${data.id}" value = "${data.id}">
    <button onclick = "deletingStudent('id${data.id}')" id="delete">X</button>

    <form method = "GET" action = "/edit"> 
      <input type = "submit" class = "editar" value = "Editar">
      <input type = "hidden" name = "id" value = "${data.id}">
    </form>
  </div>
`)

async function renderStudents() {
  const query = GetFetchQueries("student", "getAll")
  // LoaderActivate(students)
  const { error, data } = await fetchData(query);

  if(error) return console.log(error);

  if (data.students.length == 0) 
  {
    return students.innerHTML = "No se ha creado ningún estudiante en esta escuela."
  }

  let allStudents = []
  data.students.forEach(student => {
    const wrapper = document.createElement("div")
    wrapper.className = "card"
    wrapper.style.backgroundColor = '#fefefe'
    wrapper.innerHTML = studentComponent(student)

    allStudents.push(wrapper)
  });

  students.append(...allStudents)
}


window.addEventListener("load", ()=> {
  renderStudents()
})