const form = document.getElementById('edit-form');
let id = window.location.search;
id = id.replace("?id=", "");

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const query = GetFetchQueries('student', 'edit', {
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        admissionDate: formData.get('date'),
        averageGrade: formData.get('averageGrade'),
        direction: formData.get('direction'),
        id: id
    });
    
    const {data , err} = await fetchData(query);
    if (err) {
        console.error(err);
    }
    console.log(data);

})