async function deletingStudent(id) 
{
  const identifier = document.querySelector("." + id);
  const query = GetFetchQueries("student", "delete", {
    id: identifier.value
  });
  const { error, data } = await fetchData(query);
  console.log(identifier.value);
  console.log(data);
}