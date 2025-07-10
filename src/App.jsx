
import Home from './pages/Home';
import AuthPages from './pages/Register';
import { Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<AuthPages/>} />
    </Routes>
  )
}

export default App
