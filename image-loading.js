const trackRoadPic = document.createElement('img');
const trackWallPic = document.createElement('img');
const carPic = document.createElement('img');
const images = [
  {img: trackRoadPic, fileName: "track_road.png"},
  {img: trackWallPic, fileName: "track_wall.png"},
  {img: carPic, fileName: "car.png"}
];

let imagesToLoad = images.length;

function loadImages() {
  images.forEach(function (i) {
    loadImage(i.img, i.fileName);
  });
}

function loadImage(img, fileName) {
  img.onload = countImagesToLoadAndStartGameIfReadh;
  img.src = fileName;
}

function countImagesToLoadAndStartGameIfReadh() {
  imagesToLoad--;
  if (imagesToLoad == 0) {
    startGarme();
  }
}
