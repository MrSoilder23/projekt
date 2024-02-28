import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TextEditor from './components/pages/TextEditor';
import Navbar from './components/pages/Navbar';
import Pages from './components/pages/Pages';
import GraphView from './components/pages/GraphView';
import SplitScreenHandler from './components/pages/SplitScreenHandler';
import { useState } from 'react';

function App() {

  const [componentName, setComponentName] = useState("")

  const passData = (data) => {
    setComponentName(data);
  }

  return (
    <div className="App">
      <Pages />
      <div className='modules'>
        <Router>
          <Navbar dataToSend={passData}/>
          <Routes>
            <Route path='/' exact element={<SplitScreenHandler handleNames={componentName} />}/>
            <Route path='/graphview' exact element={<GraphView />}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
