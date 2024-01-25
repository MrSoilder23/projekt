import React from 'react'
import '../styles/TextEditor.css'

import FileSystem from '../editor_components/FileSystem'
import Document from '../editor_components/Document'

function TextEditor() {
  return (
    <div className='textEditorPage'>
        <FileSystem />
        
    </div>
  )
}

export default TextEditor