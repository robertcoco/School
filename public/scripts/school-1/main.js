const studentsTest = ['Carlos', 'Juan', 'Pedro', 'Yeison', 'Manolo',  'Manolo'];

const students = document.querySelector('.students');
window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
});

const fragment = document.createDocumentFragment();
const divElement = document.createElement('DIV');
divElement.className = "Nuevo"
studentsTest.map(student => {
    const card = `
    <div class="card" style = 'background: #fefefe'>
        <div class="card-body">
            <h4 class="card-title">${student}</h4>
            <p class="card-text">School:Next Bootcamp</p>
            <p id ='etiqueta'>See project</p> 
            <button id ='boton'></button>
        </div>
    </div>`
    divElement.innerHTML += card;
    fragment.appendChild(divElement); 
}) 

students.appendChild(fragment);

