import React, { useEffect, useRef, useState } from 'react'
import GraphView from './GraphView';
import TextEditor from './TextEditor';
import '../styles/SplitScreenHandler.css'

function SplitScreenHandler({handleNames}) {
    const [amountOfViews, setAmountOfViews] = useState(0);
    const [names, setNames] = useState({
        0: null,
        1: null,
        2: null
    });
    const [currentFileId, setCurrentFileId] = useState();

    useEffect(() => {
        if(handleNames !== null || handleNames !== undefined) {
            setNames(prevNames => ({...prevNames, 0: handleNames}));
            console.log(handleNames)
        }
    }, [handleNames])

    useEffect(() => {
        const views = document.querySelectorAll('.view');
        if(amountOfViews === 0) {
            views.forEach(view => view.style.width = '100%');
        } else if (amountOfViews === 1) {
            views.forEach(view => view.style.width = '50%');
        }
    }, [amountOfViews])

    const getId = (data) => {
        if(data !== null || data !== undefined) {
            setCurrentFileId(data);
            const hasSpecificName = Object.values(names).includes("Notes")
            if(amountOfViews === 0 || hasSpecificName !== true) {
                setNames(prevNames => ({...prevNames, 1: "Notes"}));
            }
            
            setAmountOfViews(1);
            
        }
    }

    function handler(name) {
        if(name === "GraphView") {
            return <GraphView fileId={getId}/>
        } else if(name === "Notes") {
            if(currentFileId !== undefined) {
                return <TextEditor passId={currentFileId}/>
            } else {
                return <TextEditor />
            }
        }
    }

    //resizer
    const isResized = useRef(false);
    const parentWidth = useRef(null);
    const [panelWidth, setPanelWidth] = useState(50);

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            if(!isResized.current) {
                return
            }
            e.preventDefault()
            const newSplitterPosition = ((e.clientX - 40)/ parentWidth.current.getBoundingClientRect().width) * 100;

            setPanelWidth(newSplitterPosition);
        })

        window.addEventListener("mouseup", () => {
            isResized.current = false;
        })
    }, [])

    //Drag and drop cards
    const dragItem = useRef();
    const dragOverItemStart = useRef();
    const dragOverItem = useRef();

    const currentTarget = useRef()
    const oldTarget = useRef();

    const dragStart = (e) => {
        dragItem.current = e.target;
        dragOverItemStart.current = e.currentTarget.parentElement.getAttribute("id");
        console.log("dragStart: " + dragOverItemStart.current)
    }
    
    const dragEnter = (e) => {
        dragOverItem.current = e.currentTarget.getAttribute("id");
        currentTarget.current = e.currentTarget;
        console.log("dragEnter: " + dragOverItem.current)

        //add border
        if(oldTarget.current !== currentTarget.current && oldTarget.current !== undefined && oldTarget.current !== null) {
            oldTarget.current.style.outline = "none";
        }

        currentTarget.current.style.outline = "var(--primary) solid 3px";
        oldTarget.current = currentTarget.current;
    }

    const drop = () => {

        const firstCard = names[0];
        const secCard = names[1];

        if(dragOverItem.current !== dragOverItemStart.current) {


            if(firstCard !== dragItem.current.textContent) {
                setNames({0: dragItem.current.textContent, 1: firstCard})
            } else if(secCard !== dragItem.current.textContent) {
                setNames({0: secCard, 1: dragItem.current.textContent})
            }
        }

        currentTarget.current.style.outline = "none";
        dragItem.current = null;
        dragOverItem.current = null;
    }

    //handle closing windows views
    function closeWindow(window) {
        if(names[0] === window) {
            setNames({0: names[1], 1: null})
        } else {
            setNames({0: names[0], 1: null})
        }
        setAmountOfViews(0)
    }

  return (
    <div className='splitHandler' ref={parentWidth}>
        <div className='view' style={{width: `${panelWidth}%`}}>
            {names[0] && <div className='cardContainer' id="windowOne" onDragEnter={(e) => dragEnter(e)} >
            <div></div>
            <div 
                className='card' 
                id="item" 
                draggable 
                onDragStart={(e) => dragStart(e)} 
                
                onDragEnd={drop}
                >{names[0]}
            </div>
            <button className='closeBtn' onClick={() => closeWindow(names[0])}>x</button>
        </div>} 
            <div className='viewContainer'>
                {handler(names[0])}
            </div>
            
        </div>
        {amountOfViews >= 1 &&  <div onMouseDown={() => {isResized.current = true}} className='resizer'></div>}
        {amountOfViews >= 1 && <div className='view' style={{width: `${100 - panelWidth}%`}}>
            {names[1] && <div className='cardContainer' id="windowTwo" onDragEnter={(e) => dragEnter(e)}>
                <div></div>
                <div 
                    className='card' 
                    id="item" 
                    draggable 
                    onDragStart={(e) => dragStart(e)} 
                    onDragEnd={drop}
                    >{names[1]}
                </div>
                <button className='closeBtn' onClick={() => closeWindow(names[1])}>x</button>
            </div>}
            <div className='viewContainer'>
                {handler(names[1])}
            </div>
        </div>}
    </div>
  )

/*
 return (
    <div className='splitHandler' ref={parentWidth}>
        <div className='view' style={{width: `${panelWidth}%`}}></div>
        <div onMouseDown={() => {isResized.current = true}} className='resizer'></div>
        <div className='view' style={{width: `${100 - panelWidth}%`}}></div>
    </div>
 )
 */

}

export default SplitScreenHandler