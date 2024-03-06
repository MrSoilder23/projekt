import React, { useEffect, useState, useRef } from 'react'
import Graph from 'react-graph-vis'
import $ from "jquery"
import { v4 as uuidv4 } from 'uuid';

import "../styles/GraphView.css"

function GraphView({fileId}) {

  const graphRef = useRef()
  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  })

  const [update, setUpdate] = useState();

  //create map
  useEffect(() => {
    $.ajax({
      type: "POST",
      url: 'http://localhost:8000/createMap.php',
      success: function(data){
      }
    })  
    fetchGraph()
  }, [])

  const fetchGraph = async () => {
    //Fetch data
    const file = await fetch('http://localhost:8000/getMap.php');
    const response = await file.json();
    
    const node = response.nodes
    const edge = response.edges

    //Change fetched data to objects
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

  const getId = (event) => {
    if(graph.nodes[0] !== undefined || graph.nodes[0] !== null) {
      const { nodes } = event;
      if (nodes.length > 0) {
        const nodeId = nodes[0];
        fileId(nodeId);
      }
    }
  }

  const graphEvents = {
    doubleClick: getId,
    
  }
  useEffect(() => {
    function handleResize() {
      setUpdate("1")
    }

    // Attach the event listener to the window object
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const timeoutRef = useRef(null)
  const search = (input) => {

    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    } 

    timeoutRef.current = setTimeout(() => {
      var nodeIdGlobal;
      
      const filteredNodes = graph.nodes.filter((node) => node.label.toLowerCase().includes(input.target.value.toLowerCase()))
      if(input.target.value.toLowerCase() !== "") {
        if( filteredNodes &&
          filteredNodes.length > 0 &&
          filteredNodes[0] &&
          filteredNodes[0].id !== undefined) {
  
          const nodeId = filteredNodes[0].id
          nodeIdGlobal = nodeId;
        }
  
        if(nodeIdGlobal) {
          graphRef.current.focus(nodeIdGlobal, {
            scale: 2, // Adjust the scale factor as needed
              animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad',
            },
          });
        }
      }

    }, 1000)
    
  }


  return (
    <div className='graphView'>
        <div className='graphViewContainer'>
          {graph.nodes[0] && <Graph graph={graph} options={options} events={graphEvents} getNetwork={(network) => (graphRef.current = network)} key={uuidv4()} />}
          <div className='searchContainer'><input className='searchBar' type="text" placeholder='Search' onInput={search}></input></div>

        </div>
    </div>
  )
}

export default GraphView