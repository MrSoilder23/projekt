import React, { useEffect, useState } from 'react'
import Graph from 'react-graph-vis'
import $ from "jquery"
import { v4 as uuidv4 } from 'uuid';

import "../styles/GraphView.css"

function GraphView() {

  const [grapha, setGraph] = useState({
    nodes: [],
    edges: []
  })

  useEffect(() => {
    $.ajax({
      type: "POST",
      url: 'http://localhost:8000/createMap.php',
      success: function(data){
        
      }
    })  
    fetchGrapha()
  }, [])

  const fetchGrapha = async () => {
    const file = await fetch('http://localhost:8000/getMap.php');
    const response = await file.json();
    
    const node = response.nodes
    const edge = response.edges

    alert(response.nodes)

    const parsedNodes = node.map(node => JSON.parse(node));
    const parsedEdges = edge.map(edge => JSON.parse(edge));

    setGraph({
      nodes: parsedNodes,
      edges: parsedEdges
    }) 

    
  }


  const options = {
    nodes: {
      borderWidth: 0,
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
      width: 4,
      selectionWidth: 3,
      color: {
        opacity: 0.5
      },
    },
    height: "100%",
  }

  return (
    <div className='graphView'>
        <div className='graphViewContainer'>
          {grapha.nodes[0] && <Graph graph={grapha} options={options} key={uuidv4()} />}

        </div>
    </div>
  )
}

export default GraphView