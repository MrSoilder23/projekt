import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TextEditor from './components/pages/TextEditor';
import Navbar from './components/pages/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<TextEditor />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
