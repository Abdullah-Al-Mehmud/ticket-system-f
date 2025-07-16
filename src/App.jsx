import Home from './pages/Home';
import Login from './pages/Login';
// import AuthPages from './pages/Register';
import Register from './pages/Register';
import UserDashboard from './pages/Dashboard/UserDashboard';
import { Routes, Route } from 'react-router-dom';
import Event from './pages/Event';
import Layout from './components/Layout';
import EventDetails from './pages/EventDetails';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import OrganizerDashboard from './pages/Dashboard/OrganizerDashboard';
function App() {
  
  return (
    <Routes>
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/event' element={<Event />} />
      <Route path='/eventdetails/:id' element={<EventDetails />} />
    </Route>
    <Route path='/user/dashboard' element={<UserDashboard />} />
     <Route path='/admin/dashboard' element={<AdminDashboard/>} />
     <Route path='/organizer/dashboard' element={<OrganizerDashboard />} />
    </Routes>
  )
}

export default App
