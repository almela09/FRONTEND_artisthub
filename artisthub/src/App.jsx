import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { Profile } from './pages/Profile/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Navbar/>
     {/* <Login/> */}
     {/* <Register/> */}
     <Profile/>
    </>
  )
}

export default App
