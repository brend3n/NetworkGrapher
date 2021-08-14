var dragging = false;
var dragging_node;

/*
  START Class: Node
*/
class Node{

  constructor(name, id, num_links){
    this.name = name;
    this.id = id;
    this.num_links = num_links;
    this.color = color(random(255),random(255),random(255));
    this.neighbors = [];
 
    this.xpos = random(0,windowWidth);
    this.ypos = random(0,windowHeight);
    this.diameter = 15;
    this.dragging = false;
    this.changed = false;
  }

  attach_nodes(neighbor){
    // console.log("attach_nodes");
    this.neighbors.push(neighbor);

    // This was migrated to the display links class method
    // line(this.xpos, this.ypos, neighbor.xpos, neighbor.ypos);
  }

  // Add a new neighbor to the current node's neighborhood
  add_link(neighbor){
    console.log(`Adding ${this.name} -> ${neighbor.name}`);
    this.num_links++;
    this.attach_nodes(neighbor);
  }

  set_pos(x,y,variation){
    this.xpos = random(x-variation, x+variation)
    this.ypos = random(y-variation, y+variation)

  }

  display_node(){
    let c = this.color
    fill(c);
    noStroke();
    ellipse(this.xpos, this.ypos, this.diameter, this.diameter);

    c = 0;
    fill(0)
    textSize(15)
    text(this.name, this.xpos, this.ypos)
  }

  display_links(){
    for(i in this.neighbors){
      stroke(100);
      line(this.xpos, this.ypos, this.neighbors[i].xpos, this.neighbors[i].ypos);
    }
  }

  display(px, py){
    this.display_node()
    this.display_links()
  }
}

/*
  END Class: Node
*/

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
    node_arr[i].display();
  }

  for(let i = 1; i < number_nodes; i++){
    node_arr[i].add_link(node_arr[i-1]);
  }
}

// Not done yet... but would like to implement it
function loadFileAsText(){
  var fileToLoad = document.getElementById("fileToLoad").files[0];

  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
      var textFromFileLoaded = fileLoadedEvent.target.result;
      document.getElementById("inputTextToSave").value = textFromFileLoaded;
  };

  fileReader.readAsText(fileToLoad, "UTF-8");

  console.log(fileReader.result);
}

// Parses the input file
function parse_input(){
  let neighborhoods = new Map();
  let node_list = [];
  array_size = result.length;
  // console.log("array_size: " + array_size);
  let i = 0;
  let count= 1;

  // Loop through the array
  while(true){
    // Get first line of neighbor hood
    /*
      current[0] = node
      current[1] = # adjacent nodes
    */
    try{
      current = result[i].split(" ");
      
    } catch(err){break;}
    print(current)
    print(current.length)
    if(current.length != 2){
      break;
    }

    current_node = current[0];
    node_list.push(current_node);
    num_neighbors = current[1];

    console.log("current node: " + current_node)
    console.log("num_neighbors: " + num_neighbors)
    // Split to get the number of adjacent nodes
    current_neighborhood = []
    i += 1;
    for(let j = 0; j < num_neighbors; j++){
      node = new Node(result[i],i, 0);
      // Adding node to list of nodes
      node_list.push(result[i])

      // Adding neighbors to list
      current_neighborhood.push(result[i++]);
    }
    console.log("current_neighborhood: " + current_neighborhood)
    // Mapping the current_node to its neighborhood
    neighborhoods.set(current_node, current_neighborhood);
  }

  console.log("\n\nNeighborhoods: " + neighborhoods)

  // Removes duplicates nodes from node_list
  node_list = [...new Set(node_list)];

  return [neighborhoods, node_list];

}


function load_network(node_list,neighborhood_map){

  node_objs = new Map();
  console.log("node_list: " + node_list)
  for (i in node_list){
    // Create node object
    print("node_name: " + node_list[i])
    node = new Node(node_list[i], i, 100)
    global_node_list.push(node);

    // Map node name to node object
    node_objs.set(node_list[i], node)
    // node.display()
  }

  for(let i = 0 ; i < node_list.length; i++){
    // Get the node object from the node_name -> node_object mapping
    node = node_objs.get(node_list[i]);

    // Get the name of the current
    node_name = node_list[i];
    if(neighborhood_map.has(node_name)){
      console.log("node: " + node_name);
      neighborhood = neighborhood_map.get(node_name);
      for (j in neighborhood){
        node.add_link(node_objs.get(neighborhood[j]));
      }
    }
  }
}

let result;
function preload(){
  result = loadStrings("output.txt");
  console.log(result)
}

function setup_canvas(){
  createCanvas(windowWidth,windowHeight);
  background(255);

}
function setup() {
  setup_canvas();

  res_arr = parse_input()
  mapping = res_arr[0];
  node_list = res_arr[1];

  load_network(node_list, mapping);
}

function mousePressed(){
  
  if (mouseButton == RIGHT){
    
  }else{
    for (i in global_node_list){
      if(dist(global_node_list[i].xpos, global_node_list[i].ypos, mouseX, mouseY) < global_node_list[i].diameter/2){
        global_node_list[i].dragging = true;
        dragging_node = global_node_list[i];
        break;
      }
    }
  }
}

function mouseReleased(){
  dragging_node.dragging = false;
}

function mouseWheel(event) {
  
  width_z = 0
  height_z = 0
  if (mouseIsPressed){
    width_z = -int(event.delta/10);
  }else{
  //move the square according to the vertical scroll amount
  height_z = int(event.delta/10);

  //uncomment to block page scrolling
  // return false;
  }
  for(i in global_node_list){
    global_node_list[i].xpos -= width_z;
    global_node_list[i].ypos += height_z;
  }
  
}

var global_node_list = [];
var selected_node;
function draw(){
  // This line fixes the dragging issue where it would show each frame of dragging
  background("white");

  // Updating position of node while dragging
  for (i in global_node_list){
    if (global_node_list[i].dragging){
      console.log("Mousing is dragging")
      global_node_list[i].xpos = mouseX;
      global_node_list[i].ypos = mouseY;
    }
    global_node_list[i].display();
  }
}



// TODO: Change how interact with graph