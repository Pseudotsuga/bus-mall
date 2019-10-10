'use strict';
//Global Variables
//Provided Data
var testingImagesArray = [
  ['bag', './img/bag.jpg'],
  ['banana', './img/banana.jpg'],
  ['bathroom', './img/bathroom.jpg'],
  ['boots', './img/boots.jpg'],
  ['breakfast', './img/breakfast.jpg'],
  ['bubblegum', './img/bubblegum.jpg'],
  ['chair', './img/chair.jpg'],
  ['cthulhu', './img/cthulhu.jpg'],
  ['dog-duck', './img/dog-duck.jpg'],
  ['dragon', './img/dragon.jpg'],
  ['pen', './img/pen.jpg'],
  ['pet-sweep', './img/pet-sweep.jpg'],
  ['scissors', './img/scissors.jpg'],
  ['shark', './img/shark.jpg'],
  ['sweep', './img/sweep.png'],
  ['tauntaun', './img/tauntaun.jpg'],
  ['unicorn', './img/unicorn.jpg'],
  ['usb', './img/usb.gif'],
  ['watering can', './img/water-can.jpg'],
  ['wine glass', './img/wine-glass.jpg']
];
//Magic Numbers
var totalImageRoundsSeenCurrent = 0;
var totalImageRoundsSeenFinish = 10;
var numberOfImages = 3;
//Referential Variables
var imageAreaTag = document.getElementById('imageArea');
var leftImageTag = document.getElementById('leftImage');
var middleImageTag = document.getElementById('middleImage');
var rightImageTag = document.getElementById('rightImage');
var myChartNode = document.getElementById('myChart').getContext('2d');
//Array Associated Variables
var formerIterationArray = [];
var currentImageIndexArray = [null, null, null];
ProductImageConstructor.allImages = [];
var foundIndexValue = null;

//Function Expressions
function ProductImageConstructor(productName, productImageFilePath){
  this.productName = productName;
  this.productImageFilePath = productImageFilePath;
  this.totalVotes = 0;
  this.timesShown = 0;

  ProductImageConstructor.allImages.push(this);
}

function randomIndex(){
  var max = ProductImageConstructor.allImages.length;
  return Math.floor(Math.random() * max + 1);
}

function arrayReset () {
  formerIterationArray = Array.of(currentImageIndexArray);
  console.log('inside reset', formerIterationArray);
  currentImageIndexArray.forEach(function(imageIndex){
    imageIndex = null;
  });
}

function randomImagePicker(){
  arrayReset();
  console.log('inside picker', currentImageIndexArray);
  console.log('inside picker', formerIterationArray);

  for (var i = 0; i < numberOfImages; i++){
    var randomIndexVariable = randomIndex();
    console.log('index value', randomIndexVariable);
    if (currentImageIndexArray.includes(randomIndexVariable)){
      randomIndexVariable = randomIndex();
    } else {
      currentImageIndexArray.push(randomIndexVariable);
    }
  }
  while (arrayMatchTest(currentImageIndexArray, formerIterationArray)){
    randomIndexVariable = randomIndex();
    if(currentImageIndexArray.includes(randomIndexVariable)){
      break;
    } else {
      currentImageIndexArray.splice(foundIndexValue, 1, randomIndex());
      console.log(currentImageIndexArray);
    }
  }
}

function arrayMatchTest(currentArray, oldArray){
  for (var i = 0; i < currentArray.length; i++){
    for (var j = 0; j < oldArray.length; j++){
      if (currentArray[i] === oldArray[j]){
        foundIndexValue = i;
        return true;
      } else {
        return false;
      }
    }
  }
}


function randomImageDisplayer(){
  console.log(currentImageIndexArray);
  leftImageTag.src = ProductImageConstructor.allImages[currentImageIndexArray[0]].productImageFilePath;
  ProductImageConstructor.allImages[currentImageIndexArray[0]].timesShown++;

  middleImageTag.src = ProductImageConstructor.allImages[currentImageIndexArray[1]].productImageFilePath;
  ProductImageConstructor.allImages[currentImageIndexArray[1]].timesShown++;

  rightImageTag.src = ProductImageConstructor.allImages[currentImageIndexArray[2]].productImageFilePath;
  ProductImageConstructor.allImages[currentImageIndexArray[2]].timesShown++;
}

function finishImageSelection(){
  imageAreaTag.removeEventListener('click', imageVoteTracker);
  var orderedListNode = document.createElement('ol');
  imageAreaTag.appendChild(orderedListNode);

  for(var i = 0; i < ProductImageConstructor.allImages.length; i++){
    var listItemNode = document.createElement('li');
    listItemNode.textContent = `${ProductImageConstructor.allImages[i].productName} was selected: ${ProductImageConstructor.allImages[i].totalVotes} out of ${ProductImageConstructor.allImages[i].timesShown} times.`;
    orderedListNode.appendChild(listItemNode);
  }
  barChart();
}

function imageVoteTracker(event){
  var targetID = event.target.id;
  if (targetID === leftImageTag.id){
    ProductImageConstructor.allImages[currentImageIndexArray[0]].totalVotes++;
  } else if (targetID === middleImageTag.id){
    ProductImageConstructor.allImages[currentImageIndexArray[1]].totalVotes++;
  } else if (targetID === rightImageTag.id){
    ProductImageConstructor.allImages[currentImageIndexArray[2]].totalVotes++;
  } else {
    alert('Please click on a specific image.');
  }
  totalImageRoundsSeenCurrent++;
  if(totalImageRoundsSeenCurrent < totalImageRoundsSeenFinish){
    randomImagePicker();
    randomImageDisplayer();
  } else {
    finishImageSelection();
  }
  localStorageSetter();
}

function labelGenerator(sourceArray){
  var labelArray = [];
  for (var i = 0; i < sourceArray.length; i++){
    labelArray.push(sourceArray[i].productName);
  }
  return labelArray;
}

function voteDataGenerator(sourceArray){
  var voteDataArray = [];
  for (var i = 0; i < sourceArray.length; i++){
    voteDataArray.push(sourceArray[i].totalVotes);
  }
  return voteDataArray;
}

function timesShownDataGenerator(sourceArray){
  var timesShownDataArray = [];
  for (var i = 0; i < sourceArray.length; i++){
    timesShownDataArray.push(sourceArray[i].timesShown);
  }
  return timesShownDataArray;
}

function instantiator(){
  for(var i = 0; i < testingImagesArray.length; i++){
    new ProductImageConstructor(testingImagesArray[i][0],testingImagesArray[i][1]);
  }
}

function barChart() {
  new Chart(myChartNode, {
    type: 'bar',
    data: {
      labels: labelGenerator(ProductImageConstructor.allImages),
      datasets: [{
        label: 'Total Votes',
        backgroundColor: 'rgba(255,0,0,1)',
        data: voteDataGenerator(ProductImageConstructor.allImages),
      },
      { label: 'Times Shown',
        backgroundColor: 'rgba(0,255,0,1)',
        data: timesShownDataGenerator(ProductImageConstructor.allImages),
      }],
    },
  }
  );
}

function localStorageSetter(){
  window.localStorage.setItem('dataState',JSON.stringify(ProductImageConstructor.allImages));
}

// function localStorageGetter(){
//   window.localStorage.getItem('dataState', JSON.parse());
//   console.log(window.localStorage.getItem('dataState', JSON.parse()));
// }

//Initalize Application
instantiator();
randomImagePicker();
randomImageDisplayer();
imageAreaTag.addEventListener('click', imageVoteTracker, false);
// document.addEventListener('load', localStorageGetter);
