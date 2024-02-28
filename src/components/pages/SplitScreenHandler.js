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
            setNames(prevNames => ({...prevNames, 1: "TextEditor"}));
            setAmountOfViews(1);
            
        }
    }

    function handler(name) {
        if(name === "GraphView") {
            return <GraphView fileId={getId}/>
        } else if(name === "TextEditor") {
            if(currentFileId !== null || currentFileId !== undefined) {
                return <TextEditor passId={currentFileId}/>
            } else {
                return <TextEditor />
            }
        }
    }

    const isResized = useRef(false);
    const parentWidth = useRef(null);
    const [panelWidth, setPanelWidth] = useState(50);



    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            if(!isResized.current) {
                return
            }

            const newSplitterPosition = ((e.clientX - 40)/ parentWidth.current.getBoundingClientRect().width) * 100;

            console.log(newSplitterPosition)

            setPanelWidth(newSplitterPosition);
        })

        window.addEventListener("mouseup", () => {
            isResized.current = false;
        })
    }, [])


  return (
    <div className='splitHandler' ref={parentWidth}>
        <div className='view' style={{width: `${panelWidth}%`}}>{handler(names[0])}</div>
        {<div onMouseDown={() => {isResized.current = true}} className='resizer'></div>}
        {amountOfViews >= 1 && <div className='view' style={{width: `${100 - panelWidth}%`}}>{handler(names[1])}</div>}
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