const nome = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const date = document.getElementById("date");
const averageGrade = document.getElementById("averageGrade");
const direction = document.getElementById("direction");
const school = document.getElementById('school');
const button = document.getElementById("Edit-Button");

let id = window.location.search;
id = id.replace("?id=", "");

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

  const query = `
  query 
  {
    student(id:"${id}") {
      id,
      name,
      age,
      admissionDate,
      lastname,
      direction,
      averageGrade,
      school
      }
    }
  `;

const formatDate = (current_datetime)=> {
  let formatted_date = current_datetime.getFullYear() 
  + "-" + (
      current_datetime.getMonth() > 10 
        ?(current_datetime.getMonth() + 1) 
        :("0" + (current_datetime.getMonth() + 1))
    ) 

  + "-" + current_datetime.getDate() > 10 
            ?(current_datetime.getDate() + 1) 
            :("0" + (current_datetime.getDate() + 1))

  return formatted_date;
}

const StudentData = fetchData(query).then(data => {
    const student = data.data.student;
    const fecha = new Date (student.admissionDate);
    let dateChange = formatDate(fecha);

    console.log(student.school);

    nome.value = student.name;
    lastName.value = student.lastname;
    age.value = student.age;
    date.value = dateChange;
    averageGrade.value = student.averageGrade;
    direction.value = student.direction;

    button.addEventListener("click", () => {

        updateStudent(
            id,
            nome.value,
            lastName.value,
            age.value,
            date.value,
            averageGrade.value,
            direction.value,
            school.value
            
        );
    })
});

function updateStudent
( 
    id,
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
    mutation UpdateStudent
    {
        updateStudent(id:"${id}", input:{
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
