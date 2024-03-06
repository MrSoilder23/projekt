import React, { useEffect, useState } from 'react'
import '../styles/TextEditor.css'

import FileSystem from '../editor_components/FileSystem'
import Document from '../editor_components/Document'

function TextEditor({passId}) {
  const [dataFromSystem, setDataFromSystem] = useState(null);
  const [update, setUpdate] = useState(null);

  const handleData = (data) => {
    setDataFromSystem(data);
  }

  const updateFile = (data) => {
    setUpdate(data);
  }

  // Retrieve Data from SplitScreenHandler
  useEffect(() => {
    if(passId !== undefined) {
      setDataFromSystem(passId);
      setUpdate(passId);
    }
  }, [passId])

  return (
    <div className='textEditorPage'>
        <FileSystem documentId={handleData} receiveUpdate={update}/>
        
        {dataFromSystem && <Document inputId={dataFromSystem} updateFiles={updateFile}/>}
    </div>
  )
}

export default TextEditor