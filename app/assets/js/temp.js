// // --------------------------
// // Temperature sensor
// // --------------------------
//
// // Connect to the backend
// const temp = io.connect('http://localhost:8082/temp');
//
// // Temperature sensor data is emitted on temp
// temp.on('temp', function (data) {
// console.log(data);
// // Generates first set of dataPoints
// updateTempChart(data);
// });
//
// // Datapoint array
// const tempDps = []; // dataPoints
//
// // Init chart (CanvasJS)
// const chart = new CanvasJS.Chart('chart',{
// 	theme: 'theme1',
// 	title:{
// 		text: 'Temperature in celcius'
// 	},
// 	animationEnabled: true,
// 	data: [{
// 		type: 'line',
// 		dataPoints: tempDps
// 	}]
// });
//
// // Update chart on changes
// let xVal = 0;
// let yVal = 22;
//
// // const updateInterval = 100;
// const dataLength = 500; // number of dataPoints visible at any point
// const updateTempChart = function(y) {
//   yVal = y;
//   tempDps.push({
//     x: xVal,
//     y: yVal
//   });
//   xVal++;
//
//   if (tempDps.length > dataLength) {
//     tempDps.shift();
//   }
//   chart.render();
// };
