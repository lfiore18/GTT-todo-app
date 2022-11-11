const url = "https://TODO-personal.lfiore18.repl.co";

function apiCall(event) {
  if (!event)
    return;

  console.log("Ahoy")
  const request = fetch(url + "/todo-item")
    .then(response => {
      console.log(response.text());
    });
  return request;
}