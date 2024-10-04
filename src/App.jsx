import { useState } from 'react'
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Components/HomePage/HomePage'
import SignUp from './Components/SignUp/SignUp'
import LogIn from './Components/LogIn/LogIn'
import FicheMembre from './Components/FicheMembre/FicheMembre'

function App() {
 

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path='/membreProfile' element={<FicheMembre />} />
        </Routes>
      </div>
     
    </Router>
  )
}

export default App
