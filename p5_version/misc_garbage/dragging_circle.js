var x = 200;
var y = 200;
var diameter = 100;
var dragging = false;

function setup() {
    createCanvas(windowWidth,windowHeight);
}

function draw() {
  background("lightskyblue");
  
  //if dragging is true
  //set x, y to mouseX, mouseY
  if(dragging){
    x = mouseX;
    y = mouseY;
  }
  
  noStroke();
  ellipse(x, y, diameter, diameter);
}//end draw

/*when mouse is pressed, 
check if mouse is intersecting w/ circle */
function mousePressed() {
  //check if mouse is over the ellipse
  if(dist(x, y, mouseX, mouseY) < diameter/2){
    dragging = true;
  }
}

function mouseReleased(){
  dragging = false;
}