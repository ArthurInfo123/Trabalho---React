import './App.css';
import Index from './pages/Index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes> 
           <Route path="/" element={<Auth />} /> 
           <Route path="/index" element={<Index />} /> 

         </Routes>
       </Router>     
    </div>
  );
}

export default App;
