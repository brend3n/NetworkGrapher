var dragging = false;
var dragging_node;
class Node{

  constructor(name, id, num_links){
    this.name = name;
    this.id = id;
    this.num_links = num_links;
    this.color = color(random(255),random(255),random(255));

    this.neighbors = [];
 
    this.xpos = random(windowWidth);
    this.ypos = random(windowHeight);
    this.diameter = 100;
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

  display_node(){
    let c = this.color
    fill(c);
    noStroke();
    ellipse(this.xpos, this.ypos, this.diameter, this.diameter);

    c = 0;
    fill(0)
    textSize(100)
    text(this.name, this.xpos, this.ypos)
  }

  display_links(){
    for(i in this.neighbors){
      stroke(100);
      line(this.xpos, this.ypos, this.neighbors[i].xpos, this.neighbors[i].ypos);
    }
  }

  display(px, py){
    // if (this.dragging){
    //   console.log("Mousing is dragging")
    //   this.xpos = mouseX;
    //   this.ypos = mouseY;
    // }
    this.display_node()
    this.display_links()
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
    node_arr[i].display();
  }

  for(let i = 1; i < number_nodes; i++){
    node_arr[i].add_link(node_arr[i-1]);
  }
  // node_arr[31].display();
  // node_arr[30].display();

  // node_arr[31].add_link(node_arr[30]);
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
  

  // console.log("node_list: " + node_list);
  // console.log("mapping: \n")
  // mapping.forEach(function(value, key){
  //   console.log(key + " = " + value);
  // });

  load_network(node_list, mapping);
  // test(50);
}

// Returns the node object that is clicked or selected
function selectedNode(){
  // TODO
}

function mousePressed(){
  print("mousePressed")
  for (i in global_node_list){
    if(dist(global_node_list[i].xpos, global_node_list[i].ypos, mouseX, mouseY) < global_node_list[i].diameter/2){
      global_node_list[i].dragging = true;
      dragging_node = global_node_list[i];
      break;
    }
  }
  // if(dist(this.x, this.y, mouseX, mouseY) < this.diameter/2){
  //   this.dragging = true;
  // }
}

function mouseReleased(){
  print("mouseReleased")
  // for(i in global_node_list){
  //   global_node_list[i].dragging = false;
  // }
  dragging_node.dragging = false;
}

var global_node_list = [];
var selected_node;
function draw(){
  // This line fixes the dragging issue where it would show each frame of dragging
  background("white");

  // for(i in global_node_list){
  //   if (global_node_list[i].dragging == true){
  //     global_node_list.xpos = mouseX;
  //     global_node_list.ypos = mouseY;
  //   }
  // }
  for (i in global_node_list){
    if (global_node_list[i].dragging){
      console.log("Mousing is dragging")
      global_node_list[i].xpos = mouseX;
      global_node_list[i].ypos = mouseY;
    }
    global_node_list[i].display();
  }

  // // Need to fix the coloring of each node
  // for(i in global_node_list){
  //   noStroke()

  //   global_node_list[i].display();
  // }
  

  // PUT SHOW FUNCTION IN HERE SO IT CAN UPDATE
}