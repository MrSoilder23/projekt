import React, { useState, useEffect } from 'react'
import $ from "jquery"
import '../styles/FileSystem.css'
import Button from '../Button.js';


function FileSystem({documentId}) {

    const [active, setActive] = useState({
        activeObject: null,
    });

    const [file, setFile] = useState([]);
    const [disabled, setDisabled] = useState(false);

    function toggleActive(index) {
        setActive({...active, activeObject: ("id: "+index)});
        documentId(index);
    }
    function toggleActiveStyle(index) {
        if(("id: "+index) === active.activeObject) {
            return "list actBtn";
        } else {
            return "list unActBtn";
        }
    }

    const createNew = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            
        });
    }

    useEffect(()=>{
        fetchD();
    },[])

    const fetchD = async () => {
        const file = await fetch('http://localhost:8000/getData.php');
        const response = await file.json();

        setFile(response.data);
    }

    const createFileBtn = () => {
        setDisabled(true);

        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    }

  return (
    <div className='fileSystem'>
        <div className='fileNavbar'>
            <ol>
                <form action='http://localhost:8000/server.php' method='post' onSubmit={(event) => createNew(event)}>
                    <button className='fileBtn' type='submit' name='save' onClick={createFileBtn}><li></li></button>
                </form>
                
                <button className='fileBtn'><li>a</li></button>
                <button className='fileBtn'><li>a</li></button>
            </ol>
            <div className='line'></div>
        </div>

        <div className='fileContainer'>
            <ol className='files'>

                {file.map((item) => {
                    return <li className='file'><Button key={"id: "+item.id} className={toggleActiveStyle(item.id)} onClick={() => {toggleActive(item.id)}} text={item.name}/></li>
                })}

                {/*
                <button onClick={fileBtn} className={active ? "actBtn" : "unActBtn"}><li><div className='folder'/>Folder1</li></button>
                
                <li className='folder'>Folder2</li>
                <li className='folder'>Folder3</li>

                <li className='file'>Dokument1</li>
                <li className='file'>Dokument2</li>
                <li className='file'>Dokument3</li>
                <li className='file'>Dokument4</li>
                */}
            </ol>
            <div className={active ? "folderAct" : "folderUnAct"}>
                <ol className="folders">
                    {/*
                    <li className='file'>Plik1</li>
                    <li className='file'>Plik1</li>
                    */}
                </ol>
            </div>
        </div>
    </div>
  )
}

export default FileSystem