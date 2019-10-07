'use strict';

// var imagesArray = [];
// var currentImagesDisplayed = [];
// var totalImagesSeenInitial = 0;
var leftImageTag = document.getElementById('leftImage');
var rightImageTag = document.getElementById('rightImage');
var leftIndexCurrent = null;
ProductImageConstructor.allImages = [];
function ProductImageConstructor(productName, productImageFilePath){
  this.productName = productName;
  this.productImageFilePath = productImageFilePath;
  //   this.totalVotes = 0;
  //   this.timesShown = 0;

  ProductImageConstructor.allImages.push(this);
}

function randomImagePicker(){
  var max = ProductImageConstructor.allImages.length;
  var leftIndexRandom = Math.floor(Math.random() * max);
  while(leftIndexRandom === leftIndexCurrent){
    leftIndexRandom = Math.floor(Math.random() * max);
  }
  leftIndexCurrent = leftIndexRandom;
}
new ProductImageConstructor('whatever', 'hello1');
new ProductImageConstructor('whatever', 'hello2');

console.log(leftIndexCurrent);
randomImagePicker();
console.log(leftIndexCurrent);

randomImagePicker();
console.log(leftIndexCurrent);

randomImagePicker();
console.log(leftIndexCurrent);

function renderNewImages(leftIndex, rightIndex){
  leftImageTag.src = ProductImageConstructor.allImages[leftIndex][1];
  rightImageTag.src = ProductImageConstructor.allImages[rightIndex][1];
}
// function imageClickEventListener(){
//   console.log('I am living');
//   if (totalImagesSeenInitial < 10){
//     var thingWeClickedOn = event.target;
//     var id = thingWeClickedOn.id;
//     if (id === leftImageTag.id){
//       leftImgOnThePage.clicks ++;
//     } else if (id === rightImageTag.id){
//       rightImgOnThePage.clicks ++;
//     }
//     renderNewImages();
//   }
//   totalImagesSeenInitial += 2;
// }


// new ImageConstructor ('bob', 'image');
// new ImageConstructor ('jane', 'image2');
// console.log(ImageConstructor.allImages);

// leftImageTag.addEventListener('click', imageClickEventListener, false);
// rightImageTag.addEventListener('click', imageClickEventListener, false);
