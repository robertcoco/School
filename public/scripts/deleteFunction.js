async function deletingStudent(id) 
{
  const identifier = document.querySelector("." + id);
  const query = GetFetchQueries("student", "delete", {
    id: identifier.value
  });
  
  const { error, data } = await fetchData(query);
  if (error) return console.error(error);
  console.log(data);
}