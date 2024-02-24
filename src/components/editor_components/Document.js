import React, { useState, useEffect, useRef } from 'react'
import $, { event } from "jquery"
import '../styles/Document.css'
import ContextMenu from '../ContextMenu';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import AlertMenu from '../AlertMenu';

function Document({inputId, updateFiles}) {

    function createHeader(type) {
        var select = document.getSelection();
        var selectedText = select.toString();

        if(type === "Header") {
            if(selectedText) {

                var elm = document.createElement('span');

                var range = select.getRangeAt(0);
                range.deleteContents();

                elm.className = "header";
                elm.style = "font-size:36px; font-weight: 800; margin-bottom: 15px;"
                var textNode = document.createTextNode(selectedText);
                elm.appendChild(textNode);
    

                range.insertNode(elm);
    
                select.removeAllRanges();
            }
        } else {
            if(selectedText) {

                const range = select.getRangeAt(0);
                const selectedNode = range.commonAncestorContainer;
        
                // Find the nearest ancestor span by traversing upwards
                const spanElement = findNearestAncestorSpan(selectedNode);
        
                if (spanElement) {
                  // Remove the span element
                  const textNode = document.createTextNode(spanElement.textContent);

                  spanElement.parentNode.replaceChild(textNode, spanElement);

                }
            }
        }

    }

    const findNearestAncestorSpan = (node) => {
        let current = node;
  
        while (current && current !== document.body) {
          if (current.nodeType === 1 && current.nodeName === 'SPAN' && current.classList.contains('header')) {
            return current;
          }
          current = current.parentNode;
        }
  
        return null;
      };
    const [currentSize, setCurrentSize] = useState(20)

    function changeSize(size) {
        var select = document.getSelection();
        var selectedText = select.toString();

        setCurrentSize(size);

        if(selectedText) {

            var range = select.getRangeAt(0);
            range.deleteContents();

            var elm = document.createElement('span');
            elm.style = "font-size:"+size+"px"
            var textNode = document.createTextNode(selectedText);
            elm.appendChild(textNode);

            range.insertNode(elm);

            select.removeAllRanges();
        }
    }
    function searchKey(element) {
        if(event.key === 'Enter') {
            changeSize(element);
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
    const [sizeList, toggleSizeList] = useState(false);

    function handleContextMenu(e) {
        e.preventDefault();
        toggleList(false);
        toggleSizeList(false);

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

        
        const select = document.getSelection();
        if (select.rangeCount > 0) {
      
            const fontSize = window.getComputedStyle(select.anchorNode.parentElement).getPropertyValue("font-size");

            var formatedFontSize = fontSize.replace("px", "");

            setCurrentSize(formatedFontSize);
        }

        
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
        setTagArray(response.data[0].tags.split(",").filter(tag => tag !== ''));

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

    const [alertMenu, isAlertMenuActive] = useState(false);
    const [alertMenuLimit, setAlertMenuLimit] = useState(0);

    //Sends update after finishing writing
    useEffect(() => {

        //Skip initial render to prevent text from deleting
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }

        const delaySendData = setTimeout(() => {
            
            //Find relates to part
            if(fileText.includes('Relates to:')) {
                const word = "Relates to:"
                const index = fileText.indexOf(word);
                const length = word.length;	

                const result = fileText.slice(index + length);

                const stopAtWord = "</"
                const array = result.split(stopAtWord);

                var noSpaceText = array[0].replace(/\s/g, '');
                
                if(alertMenuLimit === 3) {
                    setAlertMenuLimit(0);
                }

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
                        if(alertMenuLimit === 0) {
                            isAlertMenuActive(true)
                        }
                        alert("error")
                        setAlertMenuLimit((currentCount) => currentCount + 1);
                    }
                })
                alert(alertMenuLimit)
            } else {
                $.ajax({
                    type: "POST",
                    url: 'http://localhost:8000/searchFile.php',
                    data: {
                        id: inputId,
                        name: null,
                    },
                    success: function(data){
                    },
                })
            }

            updateText();
        }, 2000)

        return () => clearTimeout(delaySendData);
    },[fileText])

    function changeTextBtn(name) {
        setCurrentText(name);
        
        toggleList(false);
    }

    //Create tags
    const [tagArray, setTagArray] = useState([]);

    useEffect(() => {
        if(tagArray[0] !== null && tagArray[0] !== undefined) {
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/addTags.php',
                data: {
                    id: inputId,
                    tags: tagArray.toString()
                },
            })

            document.getElementById('tagSpace').innerHTML = tagArray;
        }
    }, [tagArray])

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
                        <Button className={"arrowDown"} text={""} onClick={() => {toggleList(!list); toggleSizeList(false)}}/>
                        <DropdownMenu isToggled={list} buttons={[
                            {text: "Header", onClick: () => {changeTextBtn("Header"); createHeader("Header")}},
                            {text: "Normal", onClick: () => {changeTextBtn("Normal"); createHeader("Normal")}}]}/>
                      </div>,
                onClick: () => {},
                isSpacer: false,
            },
            {
                text: <div className='buttons'><input className='list' onKeyDown={searchKey(this)} placeholder={currentSize} ></input>
                        <Button className={"arrowDown"} text={""} onClick={() => {toggleSizeList(!sizeList); toggleList(false)}}/>
                        <DropdownMenu isToggled={sizeList} zCoord={108} buttons={[
                            {text: "16", onClick: () => changeSize(16)},
                            {text: "18", onClick: () => changeSize(18)},
                            {text: "20", onClick: () => changeSize(20)},
                            {text: "22", onClick: () => changeSize(22)},
                            {text: "24", onClick: () => changeSize(24)},
                            {text: "26", onClick: () => changeSize(26)},
                            {text: "28", onClick: () => changeSize(28)},
                            {text: "30", onClick: () => changeSize(30)},
                            {text: "32", onClick: () => changeSize(32)},
                            ]}/>
                      </div>,
                onClick: () => {},
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
                    return <h4 id='tagSpace'>{item.tags}</h4>
                })}
                </div>
                <Button className={"roundedLight"} onClick={() => setTagArray([...tagArray, "#" + prompt()])} text={"+"}/>
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