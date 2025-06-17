


export function dijsktra(grid, startNode, finishNode){
    const visitedNodesInOrder =[];
    startNode.distance =0;
    const unvisitedNodes =getAllNodes(grid);
    while(!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if(closestNode.isWall) continue;
        //Handle walls later
        // while(currentNode.status==="wall"&& unvisitedNodes.length){
        //     currentNode=getClosestNode(nodes, unvisitedNodes)
        // }
        // HANDLE IMPOSSIBLE LATER
        // if(closestNode.distance===Infinity) return false;
        // ANIMATE LATER
        // nodesToA nimate.push(closestNode);

        closestNode.isVisited =true;
        visitedNodesInOrder.push(closestNode);
        if(closestNode===finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB)=>nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighors= getUnvisitedNeighbors(node, grid);
    for( const neighor of unvisitedNeighors){
        neighor.distance = node.distance +1;
        neighor.previousNode = node;

    }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors =[];
    const {col, row}=node;
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1)neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighor=>!neighor.isVisited);

}

function getAllNodes(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}