let timer;
let deleteFirstPhotoDelay;

// fetch the data and make a error message
async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    console.log(response);
    const data = await response.json();
    console.log(data);
    createBreedList(data.message);
  } catch (e) {
    console.log(e);
  }
}
//start the start function
start();

//Take the Data and create the Drop-Down menu
function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
          <option>Choose a dog breed</option>
          //makes an Array
          ${Object.keys(breedList)
            .map(function(breed) {
              return `<option>${breed}</option>`;
            })
            .join("")}
        </select>
    `;
}
//fetsch the images
async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideshow(data.message);
  }
}
//put the images in a slideshow and change the image every 3 sec.
function createSlideshow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  //if there are more then 1 images stwich through the images and loop it
  if (images.length < 1) {
    document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `;
    currentPosition += 2;
    if (images.length == 2) {
      currentPosition = 0;
    }
    timer = setInterval(nextSlide, 3000);
  }
  //else keep the only one image and do nothing
  else {
    document.getElementById("slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `;
  }
  //change the image all 3 sec. and if you change the breed clean the timer and the images lenght
  setInterval(nextSlide, 3000);
  function nextSlide() {
    document
      .getElementById("slideshow")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function() {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
