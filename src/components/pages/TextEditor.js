import React, { useState } from 'react'
import '../styles/TextEditor.css'

import FileSystem from '../editor_components/FileSystem'
import Document from '../editor_components/Document'
import AlertMenu from '../AlertMenu';

function TextEditor() {
  const [dataFromSystem, setDataFromSystem] = useState(null);
  const [update, setUpdate] = useState(null);

  const handleData = (data) => {
    setDataFromSystem(data);
  }

  const updateFile = (data) => {
    setUpdate(data);
  }

  return (
    <div className='textEditorPage'>
        <FileSystem documentId={handleData} receiveUpdate={update}/>
        <AlertMenu isActive={true} icon={"!"} heading={"File doesn't exist"} text={"You don’t have that file yet, do you want to create it now?"} buttonText={"Accept"}/>
        
        {dataFromSystem && <Document inputId={dataFromSystem} updateFiles={updateFile}/>}
    </div>
  )
}

export default TextEditor