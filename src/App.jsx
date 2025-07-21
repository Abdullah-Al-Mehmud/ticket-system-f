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
import CategoriesList from "./pages/Categories/CategoriesList";
import AllEventslist from "./pages/Events/AllEventslist";
import UserProfilePage from "./pages/User/UserProfilePage";
import UserEditForm from "./pages/User/UserEditForm";
import CategoryForm from "./pages/Categories/CategoryForm";
import ViewCategoryDetails from "./pages/Categories/ViewCategoryDetails";
import CategoryUpdate from "./pages/Categories/CategoryUpdate";
import TicketsList from "./pages/Tickets/TicketsList";
import TicketsForm from "./pages/Tickets/TicketsForm";
import TicketsUpdate from "./pages/Tickets/TicketsUpdate";
import ViewTicketsDetails from "./pages/Tickets/ViewTicketsDetails";

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
          <Route path="categories" element={<CategoriesList />} />
          <Route path="events" element={<AllEventslist />} />
          <Route path="user-profile/:id" element={<UserProfilePage />} />
          <Route path="edit/:id" element={<UserEditForm />} />
          <Route path="create-category" element={<CategoryForm />} />
          <Route path="categories/:id" element={<ViewCategoryDetails />} />
          <Route path="categories/edit/:id" element={<CategoryUpdate />} />
          <Route path="tickets" element={<TicketsList />} />
          <Route path="tickets/create-ticket" element={<TicketsForm />} />
          <Route path="tickets/edit/:id" element={<TicketsUpdate />} />
          <Route path="tickets/:id" element={<ViewTicketsDetails />} />
        </Route>

        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
