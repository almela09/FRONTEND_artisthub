
// import './App.css'
// import { Navbar } from './components/Navbar/Navbar'
// import { Body } from './pages/Body/Body'
// import { BrowserRouter as Router } from 'react-router-dom';
// function App() {
//   return (
//     <Router>
//       <div>
//         <Body/>
//         <Navbar/>
//       </div>
//     </Router>
//   )
// }
// export default App;
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/Navbar/Navbar'
import { Body } from './pages/Body/Body'
import { store } from './app/store.js'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Body/>
          <Navbar/>
        </div>
      </Router>
    </Provider>
  )
}

export default App;