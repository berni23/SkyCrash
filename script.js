 // javascript graphics boilerplate
 var canvas = document.getElementById("canvas")
 var context = canvas.getContext("2d");

 // parameters - change to your liking
 var STEP_MAX = 2.5;
 var STEP_CHANGE = 1.0;
 var HEIGHT_MAX = canvas.height;

 // starting conditions
 var height = Math.random() * HEIGHT_MAX;
 var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;

 // creating the landscape
 for (var x = 0; x < canvas.width; x++) {
     // change height and slope
     height += slope;
     slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

     // clip height and slope to maximum
     if (slope > STEP_MAX) {
         slope = STEP_MAX
     };
     if (slope < -STEP_MAX) {
         slope = -STEP_MAX
     };

     if (height > HEIGHT_MAX) {
         height = HEIGHT_MAX;
         slope *= -1;
     }
     if (height < 0) {
         height = 0;
         slope *= -1;
     }

     // draw column
     context.beginPath();
     context.moveTo(x, HEIGHT_MAX);
     context.lineTo(x, height);
     context.stroke();
 }