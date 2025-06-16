import React, { Component } from "react";
import Node from "./Node/Node.jsx";
import "./PathfindingVisualiser.css";
import { dijsktra } from "./algorithms/dijkstra.js";



const START_NODE_ROW=10;
const START_NODE_COL=15;
const FINISH_NODE_ROW=10;
const FINISH_NODE_COL=35;

export default class PathfindingVisualiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }
  componentDidMount() {
    const nodes = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode={
            col,
            row,
            isStart : row===10 && col===5,
            isFinish : row===10 && col===45,
        }
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    this.setState({ nodes });
  }

  visualiseDijsktra(){
    const {grid} =this.state;
    const startNode =grid[START_NODE_ROW][START_NODE_COL];
    const finshNode =grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder =dijsktra(grid,startNode,finshNode);
    const nodesInShortestPathOrder=a;
    this

  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    const { nodes } = this.state
    console.log(nodes);
    return (
      <div className="container">
      <button
      className="button" 
      onClick={()=>this.visualiseDijsktra()}>Visualise Dijkstra's Algorithm</button>
      <div className="grid">
        {nodes.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isStart, isFinish, isWall} =node;
                return (
                    <Node 
                    key={nodeIdx}
                    col ={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                    onMouseEnter={(row,col)=>
                      this.handleMouseEnter(row,col)
                    }
                    onMouseUp={()=>this.handleMouseUp()}
                    row={row}
                    ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>
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

const createNode=()=>{
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

const getNewGridWithWallToggled=()=>{
  const newGrid =gird.size();
  const node= newGrid[row][col];
  const newNode={
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col]=newNode;
  return newGrid;
}