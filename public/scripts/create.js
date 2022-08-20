const button = document.getElementById('Create-button')

button.addEventListener('click', () => {
  const nome = document.getElementById('name');
  const lastName = document.getElementById('lastName');
  const age = document.getElementById('age');
  let date = document.getElementById('date');
  const averageGrade = document.getElementById('averageGrade');
  const direction = document.getElementById('direction');
  const school = document.getElementById('school');
  const fecha = new Date(`"${date.value}"`);

  const formatDate = (current_datetime)=>{
    let formatted_date = (
      (
        (current_datetime.getMonth() < 10) ?("0" + (current_datetime.getMonth() + 1)):(current_datetime.getMonth() + 1)) + "-" + (current_datetime.getDate()
      ) + "-" + current_datetime.getFullYear()
      );
    return formatted_date;
}

  date = formatDate(fecha);

  creatingUser(
    nome.value, 
    lastName.value, 
    age.value, 
    date, 
    averageGrade.value,
    direction.value,
    school.value
    );
});

  

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

function creatingUser(
    name, 
    lastName, 
    age,
    date,
    averageGrade, 
    direction,
    school
    ) 
{
    const query =  `
    mutation NewStudent
    {
          createStudent(input:{
            name: "${name}",
            lastname: "${lastName}",
            age: ${age},
            admissionDate: "${date}",
            averageGrade: ${averageGrade},
            direction: "${direction}",
            school: "${school}"
          }) {
        id
      }
    }
    `;
    fetchData(query).then(data => console.log(data));
}