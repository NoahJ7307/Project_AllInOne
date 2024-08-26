import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hello from './components/Hello.jsx';
import About from './components/About.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
