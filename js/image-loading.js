const trackRoadPic = document.createElement('img');
const trackWallPic = document.createElement('img');
const trackGoalPic = document.createElement('img');
const trackTreePic = document.createElement('img');
const trackFlagPic = document.createElement('img');

const carPic = document.createElement('img');

const images = [
  {img: trackRoadPic, fileName: "images/track_road.png"},
  {img: trackWallPic, fileName: "images/track_wall.png"},
  {img: trackGoalPic, fileName: "images/track_goal.png"},
  {img: trackTreePic, fileName: "images/track_tree.png"},
  {img: trackFlagPic, fileName: "images/track_flag.png"},
  {img: carPic, fileName: "images/car.png"}
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
