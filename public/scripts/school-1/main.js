const studentsTest = ['Carlos', 'Juan', 'Pedro', 'Yeison', 'Manolo',  'Manolo'];

const students = document.querySelector('.students');
window.addEventListener('hashchange', () => {
    console.log(window.location.hash);
});
studentsTest.map(student => {
    students.innerHTML += `
    <div class="card" style = 'background: #fefefe'>
        <div class="card-body">
            <h4 class="card-title">${student}</h4>
            <p class="card-text">School:Next Bootcamp</p>
        </div>
    </div>`
}) 

