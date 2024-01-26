import React, { useState, useEffect } from 'react'
import $ from "jquery"
import '../styles/Document.css'

function Document({inputId, updateFiles}) {

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

    const fetchFile = async () => {
        const file = await fetch('http://localhost:8000/getFile.php?id='+inputId);
        const response = await file.json();

        setFile(response.data);
    }

    const updateName = () => {
        const form = $(document.getElementById('form'));
        
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
        });

    }

  return (
    <div className='document'>

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