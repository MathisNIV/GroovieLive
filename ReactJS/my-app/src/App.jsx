import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Room} from "./components/Node/Room.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route exact path="/room" element={<Room />}/>
            
        </Routes>
    </Router>

  )
}

export default App
