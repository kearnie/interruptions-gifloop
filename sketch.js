function setup() {
  createCanvas(700,700);
}

var gridSize = 13;
var len = 23;

function draw() {
  var vertical = Math.random() < 0.5;
  var gap = [];
  for (var i = 0; i < 4; i++) {
    var x1 = random(20,680);
    var y1 = random(20,680);
    var x2 = x1 + random(20,150);
    var y2 = y1 + random(20,150);
    gap.push([x1,y1,x2,y2]);
  }
  for (var x = 20; x < width; x = x + gridSize) {
    for (var y = 20; y < height; y = y + gridSize) {
      var show = true;
      var x1 = x;
      var y1 = y;
      var ang = Math.random() * (PI/3) + (12*PI)/7;
      if (Math.random() < 0.5) {
        ang = -ang;
      }
      if (vertical) {
        ang = ang + (PI/2);
      }
      var x2 = x1 + len * cos(ang);
      var y2 = y1 + len * sin(ang);
      for (var i = 0; i < gap.length; i++) {
        if (x2 > gap[i][0] && x2 < gap[i][2] && 
            y2 > gap[i][1] && y2 < gap[i][3] && Math.random() < 0.9) {
          show = false;
        }
      }
      if (show) {
        line(x1,y1,x2,y2);
      }
    }
  }
  noLoop();
}

function mousePressed() {
  clear();
  redraw();
}