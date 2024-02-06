import React from 'react'
import Graph from 'react-graph-vis'
import "../styles/GraphView.css"

function GraphView() {

  const graph = {
    nodes: [
      {id:1, label: "Node 1", shape: "dot", color: "red" },
      {id:2, label: "Node 2", shape: "dot", color: "red" },
      {id:3, label: "Node 3", shape: "dot", color: "red" },
      {id:4, label: "Node 4", shape: "dot", color: "red" },
      {id:5, label: "Node 5", shape: "dot", color: "red" },
      {id:6, label: "Node 6", shape: "dot", color: "lime" },
      {id:7, label: "Node 7", shape: "dot", color: "lime" },
      {id:8, label: "Node 8", shape: "dot", color: "lime" },
      {id:9, label: "Node 9", shape: "dot", color: "yellow" },
    ],
    edges: [
      {from: 1, to: 2, arrows: {to: {enabled: false}}},
      {from: 1, to: 5, arrows: {to: {enabled: false}}},
      {from: 2, to: 3, arrows: {to: {enabled: false}}},
      {from: 6, to: 7, arrows: {to: {enabled: false}}},
      {from: 7, to: 8, arrows: {to: {enabled: false}}},
    ]
  }
  
  const options = {
    nodes: {
      borderWidth: 2,
      size: 40,
      color: {
        border: "transparent",
      },
      font: {
        color: "#343240",
        face: "Inter"
      }
    },
    edges: {
      color: "#F9AA9B"
    },
    height: "100%",
  }

  return (
    <div className='graphView'>
        <div className='graphViewContainer'>
          <Graph 
            graph={graph}
            options={options}
          />
        </div>
    </div>
  )
}

export default GraphView