async function deletingStudent(id) 
{
  const identifier = document.querySelector("." + id);
  const query = GetFetchQueries("student", "delete", {
    id: identifier.value
  });
  const {error, errors, data} = await fetchData(query);
  console.log("id: ", identifier.value);
  if(error || errors) return console.log("error: ", error, "errors: ", errors);

  console.log(data);
}