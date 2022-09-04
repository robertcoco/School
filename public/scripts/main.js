const students = document.querySelector('.students');
const login = document.getElementById("login");
login.innerHTML = "logout";
login.addEventListener("click", () => {
  document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  console.log(document.cookie);
  localStorage.removeItem("jwt");
})

const studentComponent = (data) =>(`
  <div class="card" style = 'background: #fefefe'>
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
  </div>
`)

async function renderStudents() {
  
  const query = GetFetchQueries("student", "getAll")
  console.log(query);
  const studentsData = await fetchData(query);

  if (studentsData.data.students.length == 0) 
  {

    console.log("vacio no hay estudiantes, vete pa otra cosa");

  } else {

    console.log(data);
    let allStudents = []

    studentsData.data.students.forEach(student => allStudents.push(studentComponent(student)) );
    students.append(allStudents)

  }
}


window.addEventListener("load", ()=> {
  renderStudents()
})