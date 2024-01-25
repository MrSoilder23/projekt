import React, { useState, useEffect } from 'react'
import '../styles/Document.css'

function Document(id) {

    const [file, setFile] = useState([]);

    useEffect(()=>{
        fetchFile();
    },[])
    
    const fetchFile = async () => {
        const file = await fetch('http://localhost:8000/getFile.php', {method: "POST", body: {
            'Id': id,
        }});
        const response = await file.json();

        setFile(response.data);
    }

    
  return (
    <div className='document'>

        <div className='info'>
            <form method='post' action='http://localhost:8000/editFile.php' autoComplete='false' >
                {file.map((item) => { 
                    return <input type='text' className='documentName' name="name" onChange={fetchFile} placeholder="File" defaultValue={item.name} />
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