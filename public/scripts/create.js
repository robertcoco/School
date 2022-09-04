const form = document.getElementById('CreateForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form)
    const query = GetFetchQueries('student', 'create', {
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        age: formData.get('age'),
        admissionDate: formData.get('date'),
        averageGrade: formData.get('averageGrade'),
        direction: formData.get('direction'),
    });
    
    const {data , err} = await fetchData(query);
    if (err) {
        console.error(err);
    }
    console.log(data);

})