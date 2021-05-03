
class Node{

  constructor(name, id, num_links){
    this.name = name;
    this.id = id;
    this.num_links = num_links;
    this.links = [];
    // this.xpos = random(windowWidth*3);
    // this.ypos = random(windowHeight*3);
    this.xpos = random(windowWidth * 2);
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
      // console.log("j: " + j)

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

function load_network(node_list,map){
  for (node in node_list){
    // TODO
    //  Make each id a hash code -> need to migrate to node.js
    // Create node object
    node = new Node(node, node, 100);
    node.show_aa()
  }
  // map.forEach(
  //   function(value,key){
      
  //   }
  // )
}


let result;
function preload(){
  result = loadStrings("output.txt");
  console.log(result)
}

function setup_canvas(){
  createCanvas(windowWidth* 3,windowHeight*3);
  background(255);

}
function setup() {
  setup_canvas();

  res_arr = parse_input()
  mapping = res_arr[0];
  node_list = res_arr[1];
  

  console.log("node_list: " + node_list);
  console.log("mapping: \n")
  mapping.forEach(function(value, key){
    console.log(key + " = " + value);
  });
  load_network(node_list, mapping);
  // test(50);
}

// // Does a cool thing!
// function draw() {
//   test(10);
// }

function draw(){
}