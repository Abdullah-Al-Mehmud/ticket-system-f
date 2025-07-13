import Home from './pages/Home';
import Login from './pages/Login';
// import AuthPages from './pages/Register';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Event from './pages/Event';
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/event' element={<Event />} />
    </Routes>
  )
}

export default App
