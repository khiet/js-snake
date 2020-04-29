const trackPics = [];
const carPic = document.createElement('img');

let imagesToLoad = 0;

function loadImages() {
  const images = [
    {trackType: TRACK_ROAD, fileName: "images/track_road.png"},
    {trackType: TRACK_WALL, fileName: "images/track_wall.png"},
    {trackType: TRACK_GOAL, fileName: "images/track_goal.png"},
    {trackType: TRACK_TREE, fileName: "images/track_tree.png"},
    {trackType: TRACK_FLAG, fileName: "images/track_flag.png"},
    {pic: carPic, fileName: "images/car.png"}
  ];

  imagesToLoad = images.length;

  images.forEach(function (i) {
    if (i.trackType !== undefined) {
      loadTrackImage(i.trackType, i.fileName);
    } else {
      loadCarImage(i.pic, i.fileName);
    }
  });
}

function loadTrackImage(trackType, fileName) {
  trackPics[trackType] = document.createElement('img');
  trackPics[trackType].onload = countImagesToLoadAndStartGameIfReadh;
  trackPics[trackType].src = fileName;
}

function loadCarImage(img, fileName) {
  img.onload = countImagesToLoadAndStartGameIfReadh;
  img.src = fileName;
}

function countImagesToLoadAndStartGameIfReadh() {
  imagesToLoad--;
  if (imagesToLoad == 0) {
    startGarme();
  }
}
