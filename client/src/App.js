import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from'./Home';
import About from'./About';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>

    <Routes>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
