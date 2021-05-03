
class Node{

  constructor(name, id, diameter, num_links){
    this.name = name;
    this.id = id;
    this.num_links = num_links;
    this.links = [];
    this.xpos = random(windowWidth*2);
    this.ypos = random(windowHeight);
    this.diameter = diameter;

  }

  // Add a new neighbor to the current node's neighborhood
  add_link(neighbor){
    this.num_links++;
    this.links.push(neighbor);
  }

}

function test(number_nodes){
  let node_arr = [];
    for( let i = 0; i < number_nodes; i++){
      node_arr[i] = new Node(i, i, random(1,5), 0);
      let c = color(random(0,255),random(0,255),random(0,255));
      fill(c);
      noStroke();
      circle(node_arr[i].xpos, node_arr[i].ypos,node_arr[i].diameter);
    }
}

functo

function setup_canvas(){
  createCanvas(windowWidth* 2,windowHeight);
  background(255);

}
function setup() {
  setup_canvas();
  test(10);
}

// // Does a cool thing!
// function draw() {
//   test(10);
// }

function draw(){

}