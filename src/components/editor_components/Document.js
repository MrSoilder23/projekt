import React, { useState, useEffect, useRef } from 'react'
import $ from "jquery"
import '../styles/Document.css'
import ContextMenu from '../ContextMenu';

function Document({inputId, updateFiles}) {

    function highlightText() {
        const text = document.getSelection();

        document.execCommand("HiliteColor", false, "red");
    }

    //ContextMenu
    const contextMenuRef = useRef(null);
    const [contextMenu, setContextMenu] = useState({
        position: {
            x: 0,
            y: 0
        },
        toggled: false,
    });

    function handleContextMenu(e) {
        e.preventDefault();

        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();

        const isLeft = e.clientX < window?.innerWidth /2

        let x
        let y = e.clientY

        if (isLeft) {
            x = e.clientX
        } else {
            x = e.clientX - contextMenuAttr.width
        }
        
        setContextMenu({
            position: {
                x,
                y
            },
            toggled: true
        })

    }

    function resetContextMenu() {
        setContextMenu({
            position: {
                x: 0,
                y: 0
            },
            toggled: false
        })
    }

    useEffect(() => {
        function handler(e) {
            if(contextMenuRef.current) {
                if(!contextMenuRef.current.contains(e.target)) {
                    resetContextMenu()
                }
            }
        }

        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }

    })

    //File Setup
    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState('');

    useEffect(()=>{
        fetchFile();
    },[inputId, updateFiles])

    useEffect(() => {
        const delaySendData = setTimeout(() => {
            updateName();
            updateFiles(fileName);
        },4000)
        
        return () => clearTimeout(delaySendData);
    },[fileName] )

    //fetch file by sending its id
    const fetchFile = async () => {
        const file = await fetch('http://localhost:8000/getFile.php?id='+inputId);
        const response = await file.json();

        setFile(response.data);
    }

    //Update name by sending new Form
    const updateName = () => {
        const form = $(document.getElementById('form'));
        
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
        });
    }

  return (
    <div className='document' onContextMenu={(e) => handleContextMenu(e)} >

        <ContextMenu 
            contextMenuRef={contextMenuRef} 
            isToggled={contextMenu.toggled} 
            positionX={contextMenu.position.x} 
            positionY={contextMenu.position.y} 
            buttons={[
            {
                text: "Size",
                onClick: () => document.execCommand("fontSize", true, '3'),
                isSpacer: false,
            },
            {
                text: "List",
                onClick: () => document.execCommand("insertUnorderedList"),
                isSpacer: false,
            },
            {
                text: "Bold",
                onClick: () => document.execCommand("bold"),
                isSpacer: false,
            },
            {
                text: "Italic",
                onClick: () => document.execCommand("italic"),
                isSpacer: false,
            },
            {
                text: "Highlight",
                onClick: () => document.execCommand("HiliteColor", true, "yellow"),
                isSpacer: false,
            },
        ]}/>

        <div className='info'>
            <form id='form' method='post' action='http://localhost:8000/editFile.php' autoComplete='false'>
                <input className='invis' key={inputId} name='id' value={inputId}/>
                {file.map((item) => { 
                    return <input key={item.id} type='text' className='documentName' name="name" onChange={(e) => setFileName(e.target.value)} placeholder="File" defaultValue={item.name} />
                })}
            </form>
            <div className='underLine'></div>

            {file.map((item) => { 
                return <div className='data'>
                    <div className='date'><h4>{item.date}</h4></div>
                    <div className='hour'><h4>{item.hour}</h4></div>
                </div>
            })}


            <div className='tagContainer'>
                <div className='tags'>
                {file.map((item) => { 
                    return <h4>{item.tags}</h4>
                })}
                </div>
            </div>
        </div>
        <div className='textContainer'>
            <div className='text' contentEditable="true">
                <h2>Borys to gicior</h2>
                <h3>Lorem Ipsum is simply dummy text of the printing and typesetting</h3>
            </div>
        </div>
    </div>
  )
}

export default Document