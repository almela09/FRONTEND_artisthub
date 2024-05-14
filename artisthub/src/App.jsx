import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Login } from './pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Navbar/>
     <Login/>
    </>
  )
}

export default App
