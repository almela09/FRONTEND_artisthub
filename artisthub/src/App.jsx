import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Navbar/>
     {/* <Login/> */}
     <Register/>
    </>
  )
}

export default App
