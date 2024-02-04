import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TextEditor from './components/pages/TextEditor';
import Navbar from './components/pages/Navbar';
import Pages from './components/pages/Pages';
import GraphView from './components/pages/GraphView';

function App() {
  return (
    <div className="App">
      <Pages />
      <div className='modules'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<TextEditor />}/>
            <Route path='/graphview' exact element={<GraphView />}/>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
