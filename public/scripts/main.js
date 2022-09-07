const students = document.querySelector('.students');
const login = document.getElementById('login');


// Setting click function for the logout link.
login.addEventListener("click", () => {
  document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  localStorage.removeItem("jwt");
})


// Creating card element.
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
  const header = `
    <nav class="Nav-students">
    <ul class="search-button">
    <li class="li-students">
    <label for="input" class="label-students">
        Schools
        <input type="text" class="input" placeholder="Search schools">
    </label>
    </li>
    </ul>
    <ul class="ul-students">
      <li class="li-students"><button id="nuevo">New students</button></li>
      <li class="li-students"><button  id ="best">Best students</button></li>
    </ul>
    </nav>
  `;
  const query = GetFetchQueries("student", "getAll");
  LoaderActivate(students);
  
  const { error, data } = await fetchData(query);
  
  if(error) return console.log(error);
  
  if (data.students.length == 0) 
  {
    return students.innerHTML = header;
  }
  let allStudents = [];
  const div = document.createElement('div');
  data.students.forEach(student => {
    const wrapper = document.createElement("div")
    wrapper.className = "card"
    wrapper.style.backgroundColor = '#fefefe'
    wrapper.innerHTML = studentComponent(student)
    students.innerHTML = header;
    allStudents.push(wrapper);
  });
  
  div.append(...allStudents);
  students.append(div);
  const newStudent = document.getElementById('nuevo');
  const bestStudent = document.getElementById('best');
  
  newStudent.addEventListener("click", async () => {
    allStudents = [];
    const newStudentData = data.students.filter(newStudetns);    
    console.log(newStudentData);
    students.innerHTML = "";
    students.innerHTML += header;
    newStudentData.forEach(student => {

      const wrapper = document.createElement("div")
      wrapper.className = "card"
      wrapper.style.backgroundColor = '#fefefe'
      wrapper.innerHTML = studentComponent(student)
      allStudents.push(wrapper)

    });

    const nuevo1 = document.createElement('div');
    nuevo1.className = "nuevo1";
    nuevo1.append(...allStudents);
    students.append(nuevo1);
  });
  
  bestStudent.addEventListener("click", async() => {

    allStudents = [];
    let bestStudentData = data.students.filter(bestStudents);
    console.log(bestStudentData);
    students.innerHTML = header;

    bestStudentData.forEach(student => {
      const wrapper = document.createElement("div");
      wrapper.className = "card";
      wrapper.style.backgroundColor = '#fefefe';
      wrapper.innerHTML = studentComponent(student);
      allStudents.push(wrapper)
    });

    const nuevo1 = document.createElement('div');
    nuevo1.className = "nuevo1";
    nuevo1.append(...allStudents);
    students.append(nuevo1);

  });

}  
window.addEventListener("load", ()=> {
  renderStudents();
});