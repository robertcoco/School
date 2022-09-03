const students = document.querySelector('.students');

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
  const studentsData = await fetchData(query)
  let allStudents = []

  studentsData.forEach(student => allStudents.push(studentComponent(student)) );
  students.append(allStudents)
}


window.addEventListener("load", ()=> {
  renderStudents()
})