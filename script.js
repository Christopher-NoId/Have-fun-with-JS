const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];
let ready = false;
let imagesChargees = 0;
let totalImages = 0;
const count = 30;
const apiKey = 'JWYP86Em5x42y9AV0KeP6P3eX6jgmoadj3DulW9f1gE';
const API = `https://api.unsplash.com/photos/random/?client_id=${ apiKey }&count=${ count }`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attribute[key]);
  }
}

// Chargement des images

function imageChargee() {
  console.log('images chargées');
  imagesChargees++;
  console.log(imagesChargees);
  if (imagesChargees === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}
//Création des éléments  links & photos, ajout au DOM
function montrerPhotos() {
  imagesChargees = 0;
  totalImages = photos.length;
  console.log('nombre images', totalImages);
  //j'utilise la méthode forEach sur mon array de photos, avec la variable photo.
  //chaque objet de photos sera assigné à la variable photo
  photos.forEach((photo) => {

    //Création d'un <a> pour linker à Unsplash
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');

    //Amélioration du code
    //setAttributes(item, {
    //  href: photo.links.html,
    //  target: '_blank',
    //});


    //Création d'un <img> pour la photo
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    //Amélioration du code
    //setAttributes(img, {
    //  src: photo.urls.regular,
    //  alt: photo.alt_description,
    //  title: photo.alt_description
    //})

    //Event listener
    img.addEventListener('load', imageChargee);
    //On met l'img dans le <a>, et on les met dans imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}

async function getPhotos() {

  try {
    const response = await fetch(API);
    photos = await response.json();
    montrerPhotos();
  } catch (error) {

  }
}

//Si la scroll bar est en bas de page, charger plus de photos

window.addEventListener('scroll', () => {

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})
getPhotos();