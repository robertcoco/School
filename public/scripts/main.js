const studentsTest = ['Carlos', 'Juan', 'Pedro', 'Yeison', 'Manolo',  'Manolo'];

const students = document.querySelector('.students');
window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
});
const Query = `
query 
{
    school (id:"62fe5b1682ebbbb0d0f6c8e1") {
      name
    }
    school1:school (id:"62fe5b1682ebbbb0d0f6c8e2") {
      name
    }
    school2:school (id:"62fe5b1682ebbbb0d0f6c8e3") {
      name
    }
}
`;

const Schools = fetchData(Query)
.then(async data => {

  const fragment = document.createDocumentFragment();
  const divElement = document.createElement('DIV');
  divElement.className = "Nuevo"

  schools = await Object.values(data.data);

  schools.forEach(school => {
    const card = `
      <div class="card" style = 'background: #fefefe'>
          <div class="card-body">
              <h4 class="card-title">${school.name}</h4>
              <p class="card-text">School:Next Bootcamp</p>
              <p id ='etiqueta'>See students</p> 
              <a href = '/students' id ='boton'>Est</a>
          </div>
      </div>`
      divElement.innerHTML += card;
      fragment.appendChild(divElement);
  })


  students.appendChild(fragment);
})
