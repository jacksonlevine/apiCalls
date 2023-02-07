import './css/styles.css';
// Business Logic

class SearchTerm {
  constructor(inputTerm) {
    this.term = inputTerm;
  }
  static getGreen() {
    let colors = ["red", "blue", "green"]
    return colors[2];
  } 
  static getRandomColor() {
    let colors = ["red", "blue", "green"]
    return colors[Math.round(Math.random()*colors.length-1)];
  } 
}

function searchGiphy(search) 
{
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/stickers/search?q=${search}&api_key=${process.env.API_KEY}`;

    request.addEventListener("loadend", function() 
    {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });

    request.open("GET", url, true);
    request.send();
  });

  
  promise.then((fish)=>{
    printElements(fish);
  }, function(response){
    printElements(response);
  })
}


function populateTrendingSection() 
{

  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/stickers/trending?api_key=${process.env.API_KEY}&limit=60`;

  request.addEventListener("loadend", function() 
  {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrendingElements(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function populateRandomSection() 
{
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/stickers/trending?offset=25&limit=60&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() 
  {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printRandomElements(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function populateAnimalSection() 
{
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/stickers/search?q=animals&limit=60&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() 
  {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printAnimalElements(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

/*function uploadGif() {
  let request = new XMLHttpRequest();
  const url = `https://upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printAnimalElements(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}*/



// UI Logic

function printElements(apiResponse) {
  document.querySelector('#showResponse').innerText = ``; 
  let ul = document.createElement("ul");
  apiResponse.data.forEach(function(element) {
    let a = document.createElement("a");
    a.setAttribute("href", element["images"]["fixed_height_small"]["url"]);
    let gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["fixed_height_small"]["url"]);
    a.append(gif);
    ul.append(a);
  });
  document.querySelector('#showResponse').append(ul);
}

function printTrendingElements(apiResponse) {
  document.querySelector('.column #trendingSpot').innerText = ``; 
  let ul = document.createElement("ul");
  apiResponse.data.forEach(function(element) {
    let a = document.createElement("a");
    a.setAttribute("href", element["images"]["fixed_height_small"]["url"]);
    let gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["fixed_height_small"]["url"]);
    a.append(gif);
    ul.append(a);
  });
  document.querySelector('.column #trendingSpot').append(ul);
}

function printRandomElements(apiResponse) {
  document.querySelector('.column #randomSpot').innerText = ``; 
  let ul = document.createElement("ul");
  apiResponse.data.forEach(function(element) {
    let a = document.createElement("a");
    a.setAttribute("href", element["images"]["fixed_height_small"]["url"]);
    let gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["fixed_height_small"]["url"]);
    a.append(gif);
    ul.append(a);
  });

  document.querySelector('.column #randomSpot').append(ul);
}
function printAnimalElements(apiResponse) {
  document.querySelector('.column #animalSpot').innerText = ``; 
  let ul = document.createElement("ul");
  apiResponse.data.forEach(function(element) {
    let a = document.createElement("a");
    a.setAttribute("href", element["images"]["fixed_height_small"]["url"]);
    let gif = document.createElement("img");
    gif.setAttribute("src", element["images"]["fixed_height_small"]["url"]);
    a.append(gif);
    ul.append(a);
  });
  document.querySelector('.column #animalSpot').append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const searchInput = document.querySelector('#search').value;
  document.querySelector('#search').value = null;
  searchGiphy(searchInput);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
  populateTrendingSection();
  populateRandomSection();
  populateAnimalSection();
});