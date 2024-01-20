import React, {useState} from 'react'
import '../styles/Document.css'

function Document({id}) {

    const [file, setFile] = useState([])

    const fetchD = async () => {
        const file = await fetch('http://localhost:8000/getFile.php');
        const response = await file.json();

        setFile(response.data);
    }
    
  return (
    <div className='document'>
        <div className='info'>
            <form method='post' action='http://localhost:8000/getFile.php' autoComplete='false' >
                <input type='text' className='documentName' name="name" onChange={fetchD} placeholder="File" defaultValue={"aaa"} />
            </form>
            <div className='underLine'></div>

            <div className='data'>
                <div className='date'><h4>20.01.2024</h4></div>
                <div className='hour'><h4>20:01</h4></div>
            </div>

            <div className='tagContainer'>
                <div className='tags'>
                    <h4>#tag1,</h4>
                    <h4>#tag2,</h4>
                    <h4>#tag3</h4>
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