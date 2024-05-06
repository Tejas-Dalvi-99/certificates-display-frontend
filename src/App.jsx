/* eslint-disable no-unused-vars */
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Protected from './components/Protected';
import { useState } from 'react';


function App() {

  const [access, setAccess] = useState(false);
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Protected access={access} setAccess={setAccess}/>} />
      </Routes>
    </div>
  );
}

export default App;
