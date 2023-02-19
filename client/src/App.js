import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from'./Login';
import About from'./About';
import SignUp from './SignUp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
