import React, { useState, useEffect, useRef } from 'react'
import $ from "jquery"
import '../styles/Document.css'
import ContextMenu from '../ContextMenu';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import AlertMenu from '../AlertMenu';

function Document({inputId, updateFiles}) {

    function createHeader() {
        var select = document.getSelection();
        var selectedText = select.toString();

        if(selectedText) {

            var range = select.getRangeAt(0);
            range.deleteContents();

            var elm = document.createElement('span');
            elm.className = "header";
            elm.style = "font-size:36px"
            var textNode = document.createTextNode(selectedText);
            elm.appendChild(textNode);

            range.insertNode(elm);

            select.removeAllRanges();
        }

    }
    function changeSize() {
        var select = document.getSelection();
        var selectedText = select.toString();

        if(selectedText) {

            var range = select.getRangeAt(0);
            range.deleteContents();

            var elm = document.createElement('span');
            elm.style = "font-size:24px"
            var textNode = document.createTextNode(selectedText);
            elm.appendChild(textNode);

            range.insertNode(elm);

            select.removeAllRanges();
        }
    }

    function formatText(btn) {
        var select = document.getSelection();
        var selectedText = select.toString();

        if(selectedText) {

            switch(btn) {
                case 0: 
                    var range = select.getRangeAt(0);
                    range.deleteContents();

                    var elm = document.createElement('span');
                    elm.className = "header";
                    elm.style = "font-size:36px"
                    var textNode = document.createTextNode(selectedText);
                    elm.appendChild(textNode);

                    range.insertNode(elm);

                    select.removeAllRanges();
                    break;
                case 1:
                    var range = select.getRangeAt(0);
                    range.deleteContents();
                
                    var elm = document.createElement('span');
                    elm.style = "font-size:24px"
                    var textNode = document.createTextNode(selectedText);
                    elm.appendChild(textNode);
                
                    range.insertNode(elm);
                
                    select.removeAllRanges();
                    break;
            }   


        }
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
    const [currentText, setCurrentText] = useState('Header')
    const [list, toggleList] = useState(false);

    function handleContextMenu(e) {
        e.preventDefault();
        toggleList(false);

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
                    toggleList(false);
                }
            }
        }

        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }

    })

    //File Setup
    const [isInitialRender, setIsInitialRender] = useState(true);

    const [file, setFile] = useState([]);
    const [fileName, setFileName] = useState('');
    const [fileText, setFileText] = useState('');

    useEffect(()=>{
        fetchFile();
    },[inputId, updateFiles])

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

    //Wait to send new fileName
    useEffect(() => {
        const delaySendData = setTimeout(() => {
            updateName();
            updateFiles(fileName);
        },4000)
        
        return () => clearTimeout(delaySendData);
    },[fileName] )

    //Update text by sending new form
    const updateText = () => {
        
        $.ajax({
            type: "POST",
            url: 'http://localhost:8000/sendText.php',
            data: {
                text: fileText,
                id: inputId,
            },
            success: function(){
                alert("aaaa");
            }
        })
    }

    const [alertMenu, isAlertMenuActive] = useState(false)

    useEffect(() => {

        //Skip initial render to prevent text from deleting
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
          }
        //Find relates to part
        if(fileText.includes('Relates to:')) {
            const word = "Relates to:"
            const index = fileText.indexOf(word);
            const length = word.length;	

            const result = fileText.slice(index + length);

            const stopAtWord = "</"
            const array = result.split(stopAtWord);
            
            var noSpaceText = array[0].replace(/\s/g, '');


            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/searchFile.php',
                data: {
                    id: inputId,
                    name: noSpaceText,
                },
                success: function(data){
                    alert(data);
                },
                error: function() {
                    isAlertMenuActive(true)
                    alert("error")
                }
            })

            
        }

        const delaySendData = setTimeout(() => {
            
            updateText();
        }, 2000)

        return () => clearTimeout(delaySendData);
    },[fileText])

    function changeTextBtn(name) {
        setCurrentText(name);
        
        toggleList(false);
    }

  return (
    <div className='document' onContextMenu={(e) => handleContextMenu(e)} >

        <AlertMenu 
            isActive={alertMenu} 
            icon={"!"}
            heading={"File doesn't exist"} 
            text={"You don’t have that file yet, do you want to create it now?"} 
            buttonText={"Accept"}
            onClose={(e) => isAlertMenuActive(false)}
        />

        <ContextMenu 
            contextMenuRef={contextMenuRef} 
            isToggled={contextMenu.toggled} 
            positionX={contextMenu.position.x} 
            positionY={contextMenu.position.y} 
            buttons={[
            {
                text: <div className='buttons'>{currentText}
                        <Button className={"arrowDown"} text={""} onClick={() => toggleList(!list)}/>
                        <DropdownMenu isToggled={list} buttons={[
                            {text: "Header", onClick: () => changeTextBtn("Header")},
                            {text: "Normal", onClick: () => changeTextBtn("Normal")}]}/>
                      </div>,
                onClick: () => formatText(0),
                isSpacer: false,
            },
            {
                text: <div className='buttons'><input className='list' defaultValue={20}></input>
                        <Button className={"arrowDown"} text={""} onClick={() => toggleList(!list)}/>
                        <DropdownMenu isToggled={list} buttons={[
                            {text: "16", onClick: () => changeTextBtn("")},
                            {text: "18", onClick: () => changeTextBtn("")},
                            {text: "20", onClick: () => changeTextBtn("")},
                            {text: "22", onClick: () => changeTextBtn("")},
                            {text: "24", onClick: () => changeTextBtn("")},
                            {text: "26", onClick: () => changeTextBtn("")},
                            {text: "28", onClick: () => changeTextBtn("")},
                            {text: "30", onClick: () => changeTextBtn("")},
                            {text: "32", onClick: () => changeTextBtn("")},
                            ]}/>
                      </div>,
                onClick: () => formatText(1),
                isSpacer: false,
            },
            {
                text: "List",
                onClick: () => document.execCommand("insertUnorderedList"),
                isSpacer: false,
            },
            {
                text: <b>B</b>,
                onClick: () => document.execCommand("bold"),
                isSpacer: false,
            },
            {
                text: <i>i</i>,
                onClick: () => document.execCommand("italic"),
                isSpacer: false,
            },
            {
                text: <u>U</u>,
                onClick: () => document.execCommand("underLine"),
                isSpacer: false,
            },
            {
                text: "A",
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
            {file.map((item) => {
                return <div className='text' id='text' contentEditable="true" onInput={(e) => setFileText(e.currentTarget.innerHTML)} dangerouslySetInnerHTML={{__html: item.text}}/>
            })}
        </div>
    </div>
  )
}

export default Document