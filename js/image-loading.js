const worldPics = [];
const warrior1Pic = document.createElement('img');

let imagesToLoad = 0;

function loadImages() {
  const images = [
    {worldType: WORLD_ROAD, fileName: "images/world_road.png"},
    {worldType: WORLD_WALL, fileName: "images/world_wall.png"},
    {worldType: WORLD_GOAL, fileName: "images/world_goal.png"},
    {worldType: WORLD_TREE, fileName: "images/world_tree.png"},
    {worldType: WORLD_FLAG, fileName: "images/world_flag.png"},
    {pic: warrior1Pic, fileName: "images/warrior.png"},
  ];

  imagesToLoad = images.length;

  images.forEach(function (i) {
    if (i.worldType !== undefined) {
      loadWorldImage(i.worldType, i.fileName);
    } else {
      loadWarriorImage(i.pic, i.fileName);
    }
  });
}

function loadWorldImage(worldType, fileName) {
  worldPics[worldType] = document.createElement('img');
  worldPics[worldType].onload = countImagesToLoadAndStartGameIfReadh;
  worldPics[worldType].src = fileName;
}

function loadWarriorImage(img, fileName) {
  img.onload = countImagesToLoadAndStartGameIfReadh;
  img.src = fileName;
}

function countImagesToLoadAndStartGameIfReadh() {
  imagesToLoad--;
  if (imagesToLoad == 0) {
    startGarme();
  }
}
