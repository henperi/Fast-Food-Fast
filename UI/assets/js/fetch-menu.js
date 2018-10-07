window.onload = () => {
  const fetchUrl = "http://localhost:5000/api/v1/menu";

  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => console.log(data));
};
