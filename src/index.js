import './css/styles.css';

// Business Logic

function searchGiphy(search) {
  let request = new XMLHttpRequest();
  const url = `http://api.giphy.com/v1/stickers/search?q=${search}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse) {
  document.querySelector('#showResponse').innerText = ``; 
  let ul = document.createElement("ul");
  apiResponse.data.forEach(function(element) {
    let gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["downsized"]["url"]);
    ul.append(gif);
  });
       //DISPLAY HERE
  document.querySelector('#showResponse').append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  searchGiphy(searchInput);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});