import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import { Routes, Route } from "react-router-dom";
import Event from "./pages/Event";
import Layout from "./components/Layout";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import OrganizerDashboard from "./pages/Dashboard/OrganizerDashboard";
import NotFound from "./pages/Notfound";
import UserList from "./pages/User/UserList";
import AdminLayout from "./Layout/AdminLayout";
import CreateUser from "./pages/User/CreateUser";

function App() {
  return (
    <Routes>
      {/* Public layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="event" element={<Event />} />
        <Route path="eventdetails/:id" element={<EventDetails />} />
      </Route>

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />

        {/* Admin layout covers /admin/* */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="create-user" element={<CreateUser />} />
          {/* Add more admin routes as needed */}
        </Route>

        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
