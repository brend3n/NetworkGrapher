# NetworkGrapher

NetworkGrapher is a network or graph visualizer created with the p5 Javascript library. The aim of this is to easily visualize networks on a web application. After having trouble with importing data into network visualization software like Cytoscape, NetworkGrapher was created to easily load in a network from a text file.


Download p5.js library

p5 JS: https://p5js.org/download/

## Input
Currently, all input must follow an adjacency list representation. In the future, I would like to allow for adjacency matrix representation of graphs, however, those usually require more storage.

### Input Format
<br>node_name n (where n is the number of neighbors to the node)
neighbor_1<br>
neighbor_2<br>
neighbor_3<br>
...<br>
neighbor_n<br>

<br>
### Example
<br>Spongebob 3<br>
Patrick<br>
Sandy<br>
Squidward<br>
Mr.Krabs 1<br>
Pearl<br>



### To-Do
- [ ] Nodes are colored based on neighborhoods
- [ ] If one nodes is in two or more different groups, blend the colors together for that node
- [ ] Keep track of information about the network
- [ ] Unlimited scrolling 
- [ ] Dyanmic loading such that large amounts of data can be visualized incrementally
- [ ] Group nodes in the same neighborhood close to eachother -> adjust randomness of node location
