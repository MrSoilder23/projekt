import React, { useState } from 'react'
import '../styles/TextEditor.css'

import FileSystem from '../editor_components/FileSystem'
import Document from '../editor_components/Document'

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
        
        {dataFromSystem && <Document inputId={dataFromSystem} updateFiles={updateFile}/>}
    </div>
  )
}

export default TextEditor