// gif framework by Golan Levin, Sep 2016

var nFramesInLoop = 120;
var nElapsedFrames;
var bRecording;
var bIAmRunningThisOnMyLaptop = true;
var c1,c2;
var Y_AXIS = 2;
var initialStarPostitions;
function setup() {
  createCanvas(400,400);
  bRecording = false;
  nElapsedFrames = 0;
  c1 = color(17,24,51);
  //c2 = color(24,55,112);
  c2 = color(0,121,201);
  initialStarPositions = []
  var moreStars = 15;
  for (var i = 0; i < moreStars; i++) {
    var star = {x: Math.random()*width, y: Math.random()*height, spinRate: ((Math.random()-.5)*8*PI), initialSpin: Math.random()*2*PI, scale:0.7+Math.random(),
      maxOpacity: random(120,175), minOpacity: random(-50,-20)
    };
    initialStarPositions.push(star);
  }
}

function keyPressed () {
  if (bIAmRunningThisOnMyLaptop) {
    bRecording = true;
    nElapsedFrames = 0;
  }
}

function draw() {
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }
  renderMyDesign(percentCompleteFraction);
  
  if (bRecording & bIAmRunningThisOnMyLaptop) {
    var frameOutputFilename = "Keali-loop-" + nf(nElapsedFrames,4) + ".png";
    println("Saving output image: " + frameOutputFilename);
    saveCanvas(frameOutputFilename);
    nElapsedFrames++;
    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}
function drawStar(starData,percent) {
  push();
  var y = (starData.y + (percent*height)) % height;
  var a1 = (max(0,map(y,0,height,starData.maxOpacity,starData.minOpacity)));
  fill(255,255,255,a1);
  translate(starData.x,y);
  var rotation = (percent*starData.spinRate) % (2*PI);
  scale(starData.scale);
  rotate(rotation);
  star(0, 0, 3, 7, 6); 
  pop();
}

var yoff = 0.0;
var yoff2 = 0.0;
function renderMyDesign(percent) {
  background(180);
  setGradient(0,0,width,height,c1,c2,Y_AXIS);
  smooth();
  noStroke();
  
// noise waves
  fill(255,255,255,15);
  beginShape();
  var xoff = 0;
  
  for (var x = 0; x <= width; x += 10) {
    var y = map(noise(xoff,yoff),0,1,150,250);
    vertex(x,y);
    xoff += 0.05;
  }
  yoff += 0.01;
  vertex(width,height);
  vertex(0,height);
  endShape(CLOSE);
  
  fill(255,255,255,30);
  beginShape();
  var xoff2 = 0;
  
  for (var x = 0; x <= width; x += 10) {
    var y = map(noise(xoff2,yoff2),0,1,200,400);
    vertex(x,y);
    xoff2 += 0.05;
  }
  yoff2 += 0.01;
  vertex(width,height);
  vertex(0,height);
  endShape(CLOSE);
  
  var cx = 100;
  var cy = 100;

  var ellipsePulse = sin(3.0 * percent * TWO_PI);
  var ellipseW = map(ellipsePulse, -1, 1, 20, 50);
  var ellipseH = map(ellipsePulse, -1, 1, 50, 30);
  var ellipseColor = map(ellipsePulse, -1, 1, 150, 255);
  fill(ellipseColor, 255, 255);
  
// stars
  for (var i = 0; i < initialStarPositions.length; i++) {
    var starData = initialStarPositions[i];
    drawStar(starData,percent);
  }
  
// set waves
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.25);
    var sy = 300 + 25.0 * cos((t + percent) * TWO_PI);
    ellipse(sx, sy, 3, 3);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.25);
    var sy = 220 + 65.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 2, 2);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.25);
    var sy = 300 + 25.0 * cos((t + percent) * TWO_PI);
    ellipse(sx, sy, 1.5, 1.5);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.35);
    var sy = 350 + 30.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 1, 1);
  }

  for (var sx = 0; sx <= height; sx+= 4) {
    var t = map(sx, 0, height, 0.0, 0.7);
    var sy = 280 + 60.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 3, 3);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.25);
    var sy = 300 + 30.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 2, 2);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.5);
    var sy = 250 + 60.0 * sin((t + percent) * TWO_PI);
    ellipse(sx, sy, 3.5, 3.5);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.4);
    var sy = 280 + 90.0 * cos((t + percent) * TWO_PI);
    ellipse(sx, sy, 1, 1);
  }
  
  for (var sx = 0; sx <= height; sx += 4) {
    var t = map(sx, 0, height, 0.0, 0.6);
    var sy = 220 + 10.0 * cos((t + percent) * TWO_PI);
    ellipse(sx, sy, 1.5, 1.5);
  }
}


function setGradient(x,y,w,h,c1,c2,axis) { // for gradient sea to sky
  noFill();
  if (axis == Y_AXIS) {  // Top to bottom gradient (y axis)
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  } 
}

// https://p5js.org/examples/examples/Form_Star.php
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}