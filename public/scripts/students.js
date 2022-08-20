const studentsTest = ['Carlos', 'Juan', 'Pedro', 'Yeison', 'Manolo',  'Manolo'];

const students = document.querySelector('.students');

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


const Query = `
query 
{
  students {
    id
    name,
    direction,
      averageGrade
    }
  }
`;

// showing students on the page
const Schools = fetchData(Query)
.then(async data => {
  
  const fragment = document.createDocumentFragment();
  const divElement = document.createElement('DIV');
  divElement.className = "Nuevo";
  
  const schools =  await data.data.students;

  let i = 0;
  schools.forEach(school => {
    const card = `
    <div class="card" style = 'background: #fefefe'>
          <div class="card-body">
          <h4 class="card-title">${school.name}</h4>
          <p class="card-text">${school.direction}</p>
          <p id ='etiqueta'>${school.averageGrade}</p> 
          <input type = "hidden" class= "id${school.id}" value = "${school.id}">
          <button onclick = "deletingStudent('id${school.id}')" id="delete">X</button>
          </div>
          </div>`
          divElement.innerHTML += card;
          fragment.appendChild(divElement);
        })
        
        students.appendChild(fragment);

      })
      
function deletingStudent(id) 
{
    id = document.querySelector("."+id);
    console.log(id.value);
    const queryDelete = `
      mutation DeleteStudent {
        deleteStudent(id:"${id.value}"){
          name
        }
      }
    `;
    fetchData(queryDelete).then(data => console.log(data.data));
    location.reload();
}
