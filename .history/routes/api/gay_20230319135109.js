class Node {
    constructor(row, col, value) { 
        this.id = row.toString() + '-' + col.toString();
        this.row = row;
        this.col = col;
        this.value = value;
        this.distanceFromStart = Infinity;
        this.estimatedDistanceToEnd = Infinity;
        this.cameFrom = null;
        }
    }
    // O(w * h * log(w * h)) time | O(w*h) space - where
    // w is the width of the graph and h is the height 
function aStarAlgorithm(startRow, startCol, endRow, endCol, graph) { 
    const nodes = initializeNodes(graph);
    const startNode = nodes [startRow][startCol]; 
    const endNode = nodes[endRow][endCol];

    startNode.distanceFromStart = 0; 
    startNode.estimatedDistanceToEnd = calculateManhattanDistance(startNode, endNode);

    const nodesToVisit = new MinHeap([startNode]);

    while (!nodesToVisit.isEmpty()) {
        const currentMinDistanceNode = nodesToVisit.remove();

        if (currentMinDistanceNode === endNode) break;

        const neighbors = getNeighboringNodes(currentMinDistanceNode, nodes); 
        for (const neighbor of neighbors) {
            if (neighbor.value == 1) continue;

            const tentativeDistanceToNeighbor = currentMinDistanceNode.distanceFromStart + 1;

            if (tentativeDistanceToNeighbor >= neighbor.distanceFromStart) continue;

            neighbor.cameFrom = currentMinDistanceNode;
            neighbor.distanceFromStart = tentativeDistanceToNeighbor;
            neighbor.estimatedDistanceToEnd = tentativeDistanceToNeighbor + calculateManhattanDistance(neighbor, endNode);

            if (!nodesToVisit.containsNode(neighbor)) {
                nodesToVisit.insert(neighbor);
            } else {
                nodesToVisit.update(neighbor);
            }
        }
    }
    return reconstructPath(endNode); 
}

function initializeNodes(graph) {
    const nodes = [];

    for (const [i, row] of graph.entries()) { 
        nodes.push([]); 
        for (const [j, value] of row.entries()) { 
            const node = new Node(i, j, value); 
            nodes[i].push(node);
        }
    }
    return nodes;
}

function calculateManhattanDistance(currentNode, endNode) {
    const currentRow = currentNode.row; 
    const currentCol = currentNode.col;
    const endRow = endNode.row; 
    const endCol = endNode.col;

    return Math.abs(currentRow - endRow) + Math.abs(currentCol - endCol);
}

function getNeighboringNodes (node, nodes) { const neighbors = [];
const numRows = nodes.length;
const numCols = nodes[0].length;
const row = node.row;
const col = node.col;
if (row < numRows - 1) { 
// DOWN 
    neighbors.push(nodes [row + 1][col]);
}
V if (row > 0) { 
// UP
neighbors.push(nodes [row - 1][col]); -
}
if (col < numCols - 1) {
// RIGHT 
    neighbors.push(nodes[row][col + 1]); }
if (col > 0) { 
// LEFT
neighbors.push(nodes [row][col - 1]);
}
    return neighbors;
}

function reconstructPath(endNode) {
if (endNode.cameFrom == null) {
return [];
}
let currentNode = endNode;
const path = [];
while (currentNode != null) {
path.push([currentNode.row, currentNode.col]); 
    currentNode = currentNode.cameFrom;
}
path.reverse(); 
// reverse path so it goes from start to end
return path;
}
class MinHeap {
constructor(array) {
// Holds the position in the heap that each node is at 
    this.nodePositionsInHeap = array.reduce((obj, node, i) => { 
    obj[node.id] = i;
    return obj;
}, {});
    this.heap = this.buildHeap(array);
}
isEmpty() {
return this.heap.length == 0;
}