let trackRoadPic = document.createElement('img');
let trackWallPic = document.createElement('img');
let carPic = document.createElement('img');

let imagesToLoad = 3;

function loadImages() {
  loadTrackImages();
  loadCarImage();
}

function loadTrackImages() {
  trackRoadPic.onload = countImagesToLoadAndStartGameIfReadh;
  trackWallPic.onload = countImagesToLoadAndStartGameIfReadh;

  trackRoadPic.src = "track_road.png";
  trackWallPic.src = "track_wall.png";
}

function loadCarImage() {
  carPic.onload = countImagesToLoadAndStartGameIfReadh;
  carPic.src = "car.png";
}

function countImagesToLoadAndStartGameIfReadh() {
  imagesToLoad--;
  if (imagesToLoad == 0) {
    startGarme();
  }
}
