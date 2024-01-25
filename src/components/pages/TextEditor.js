import React, { useState } from 'react'
import '../styles/TextEditor.css'

import FileSystem from '../editor_components/FileSystem'
import Document from '../editor_components/Document'

function TextEditor() {
  const [dataFromSystem, setDataFromSystem] = useState(null);

  const handleData = (data) => {
    setDataFromSystem(data);
  }

  return (
    <div className='textEditorPage'>
        <FileSystem documentId={handleData}/>
        
        {dataFromSystem && <Document inputId={dataFromSystem}/>}
    </div>
  )
}

export default TextEditor