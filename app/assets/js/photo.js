// 'use strict';
//
// // --------------------------
// // Photoresistor
// // --------------------------
//
// // Connect to the backend
// const photo = io.connect('http://localhost:8082/photo');
//
// // Photoresistor data is emitted on photo
//
// photo.on('photo', function (data) {
//   // Generates first set of dataPoints
//
//   updatePhotoChart(data);
// });
//
// //Datapoint array
// const photoDps = []; // dataPoints
//
// //Init chart (CanvasJS)
// const photoChart = new CanvasJS.Chart('chartPhoto', {
//   theme: 'theme1',
//   title:{
//   text: 'Illuminance from photoresistor'
//   },
//   animationEnabled: true,
//   data: [{
//   type: 'line',
//   dataPoints: photoDps
//   }]
// });
//
// // Update chart on changes
// const xValPhoto = 0;
// const updateIntervalPhoto = 100;
// const dataLengthPhoto = 500; // number of dataPoints visible at any point
// const updatePhotoChart = function(y) {
//   const yValPhoto = y;
//
//   photoDps.push({
//     x: xValPhoto,
//     y: yValPhoto
//   });
//
//   xValPhoto++;
//
//   if (photoDps.length > dataLengthPhoto) {
//     photoDps.shift();
//   }
//   photoChart.render();
// };
