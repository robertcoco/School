function LoaderActivate(Wrapper) {
    Wrapper.innerHTML = `
    <div class="loader">
        <div class="loader-element">Cargando estudiantes ......</div>
    </div>
    `
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
     if ((new Date().getTime() - start) > milliseconds) {
      break;
     }
    }
   }
   
function bestStudents(student) {
    if (student.averageGrade >= 80) return student;
}

function newStudetns(student) {
    const comparisonDate = new Date('2022-07-24');
    const datOfStudent = new Date(`'${student.admissionDate}'`);
    if (datOfStudent > comparisonDate ) return student;
 }

 