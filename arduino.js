'use strict';
const five = require('johnny-five');

module.exports = function() {
  console.log('______________________|===========|__________________________');
  console.log('______________________|--Arduino--|__________________________');
  console.log('______________________|===========|__________________________');
  const board = new five.Board({
    repl: false
  });

  board.on("ready", function() {
    var rgb = new five.Led.RGB([6, 5, 3]); //pins with options obj and pins obj
    var index = 0;
    //  var rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"];
     var rainbow = ['#5d8aa8', '#ffbf00',' #a4c639']

    this.loop(1000, function() {
      if (index + 1 === rainbow.length) {
        index = 0;
      }
      rgb.color(rainbow[index++]);
      rgb.intensity(1000);
    });
  });
};
