
class Node{

  constructor(name, id, num_links){
    this.name = name;
    this.id = id;
    this.num_links = num_links;
    this.links = [];
    this.xpos = random(windowWidth*2);
    this.ypos = random(windowHeight);
  

  }

  attach_nodes(neighbor){
    console.log("attach_nodes");
    stroke(100);
    line(this.xpos, this.ypos, neighbor.xpos, neighbor.ypos);
  }

  // Add a new neighbor to the current node's neighborhood
  add_link(neighbor){
    console.log("add_link");
    this.num_links++;
    this.links.push(neighbor);
    this.attach_nodes(neighbor);
  }

  show_aa(){
    let c = color(random(0,255),random(0,255),random(0,255));
    fill(c);
    noStroke();
    circle(this.xpos, this.ypos, this.num_links);
  }

}

function test(number_nodes){
  let node_arr = [];
  for( let i = 0; i < number_nodes; i++){

    // The num_links parameter controls the diameter of the node.
    // Right now i choose a random value, however, I should really
    // have it reflect the number of links a node has

    node_arr[i] = new Node(i, i, random(10,100));
    // let c = color(random(0,255),random(0,255),random(0,255));
    // fill(c);
    // noStroke();
    // circle(node_arr[i].xpos, node_arr[i].ypos, node_arr[i].diameter);
    node_arr[i].show_aa();
  }

  for(let i = 1; i < number_nodes; i++){
    node_arr[i].add_link(node_arr[i-1]);
  }
  // node_arr[31].show_aa();
  // node_arr[30].show_aa();

  // node_arr[31].add_link(node_arr[30]);

  
}

function setup_canvas(){
  createCanvas(windowWidth* 2,windowHeight);
  background(255);

}
function setup() {
  setup_canvas();
  test(100);


}

// // Does a cool thing!
// function draw() {
//   test(10);
// }

function draw(){
}