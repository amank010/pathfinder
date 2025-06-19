import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import "./PathfindingVisualiser.css";
import { dijsktra, getNodesInShortestPathOrder } from "./algorithms/dijkstra.js";



const START_NODE_ROW=10;
const START_NODE_COL=15;
const FINISH_NODE_ROW=10;
const FINISH_NODE_COL=35;

export default class PathfindingVisualiser extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      shortestPathLengh: 0,
    };
  }
  componentDidMount() {
    const grid =getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row,col){
    const newGrid = getNewGridWithWallToggled(this.state.grid, row,col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row,col){
    if(!this.state.mouseIsPressed) return;
    const newGrid=getNewGridWithWallToggled(this.state.grid,row,col);
    this.setState({grid: newGrid})

  }

  handleMouseUp(){
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder){
    for(let i=0;i<= visitedNodesInOrder.length;i++){
      if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        this.animateInShortestPath(nodesInShortestPathOrder)
        console.log(nodesInShortestPathOrder)
      }, 10 * i);
      return;
    }
      setTimeout(()=>{
      const node= visitedNodesInOrder[i];
      
      document.getElementById(`node-${node.row}-${node.col}`).className='node node-visited';
      },10*i);
    }
  }

  animateInShortestPath(nodesInShortestPathOrder){
    for(let i=0; i<nodesInShortestPathOrder.length; i++){
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className='node node-shortest-path';
      }, 25*i);
    }
  }

  visualiseDijsktra(){
    const {grid} =this.state;
    const startNode =grid[START_NODE_ROW][START_NODE_COL];
    const finshNode =grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder =dijsktra(grid,startNode,finshNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finshNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
   
    this.setState({ shortestPathLengh: nodesInShortestPathOrder.length});

  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    
    return (
      <>
      <div className="container">

        <div className="container2">
      <button
      className="button" 
      onClick={()=>this.visualiseDijsktra()}>Visualise Dijkstra's Algorithm</button>
      <p className="Shortest-path">Total shortest steps : {this.state.shortestPathLengh}</p>
        </div>
      
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isStart, isFinish, isWall} =node;
                return (
                  <Node 
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  col={col}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                  onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                  onMouseUp={()=>this.handleMouseUp()}
                  isWall ={isWall}
                  row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
        </>
    );
  }
}

const getInitialGrid=()=>{
  const grid = [];
  for(let row=0; row<20; row++){
    const currentRow=[];
    for(let col=0;col<50;col++){
      currentRow.push(createNode(col,row));
    }
    grid.push(currentRow);
  }
  return grid;
}

const createNode=(col,row)=>{
  return{
    col,
    row,
    isStart: row=== START_NODE_ROW && col===START_NODE_COL,
    isFinish : row === FINISH_NODE_ROW && col===FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

const getNewGridWithWallToggled=(grid, row, col)=>{
  const newGrid =grid.slice();
  const node= newGrid[row][col];
  const newNode={
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col]=newNode;
  return newGrid;
}