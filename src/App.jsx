import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import UserDashboard from "./pages/Dashboard/UserDashboard/UserDashboard";
import { Routes, Route } from "react-router-dom";
import Event from "./pages/Event";
import Layout from "./components/Layout";
import EventDetails from "./pages/EventDetails";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
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
import EventForm from "./pages/Events/EventForm";
import ViewEventsDetails from "./pages/Events/ViewEventsDetails";
import EventEditForm from "./pages/Events/EventEditForm";
import TicketsList from "./pages/Tickets/TicketsList";
import TicketsForm from "./pages/Tickets/TicketsForm";
import TicketsUpdate from "./pages/Tickets/TicketsUpdate";
import ViewTicketsDetails from "./pages/Tickets/ViewTicketsDetails";
import PublicRoute from "./components/PublicRoute";
import UserLayout from "./Layout/UserLayout";
import UserViewTicket from "./pages/Dashboard/UserDashboard/UserViewTicket";
import OrganizerLayout from "./Layout/OrganizerLayout";
import EventManagement from "./pages/Dashboard/OrganizerDashboard/EventManagement";
import OrganizerDashboard from "./pages/Dashboard/OrganizerDashboard/OrganizerDashboard";
import CreateEventOrganizer from "./pages/Dashboard/OrganizerDashboard/CreateEventOrganizer";
import EventDetailsDetails from "./pages/Dashboard/OrganizerDashboard/EventDetailsDetails";

function App() {
  return (
    <Routes>
      {/* Public layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="event" element={<Event />} />
        <Route path="event-details/:id" element={<EventDetails />} />
        <Route path="contact" element={<Contact />} />


        <Route element={<PublicRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>


      <Route element={<PrivateRoute allowRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
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
          <Route path="create-event" element={<EventForm />} />
          <Route path="events-details/:id" element={<ViewEventsDetails />} />
          <Route path="event-edit/:id" element={<EventEditForm />} />
          <Route path="tickets" element={<TicketsList />} />
          <Route path="tickets/create-ticket" element={<TicketsForm />} />
          <Route path="tickets/edit/:id" element={<TicketsUpdate />} />
          <Route path="tickets/:id" element={<ViewTicketsDetails />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowRole="user" />}>
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="user-view-ticket/:id" element={<UserViewTicket />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowRole="organizer" />}>
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route path="dashboard" element={<OrganizerDashboard />} />
          <Route path="event-management" element={<EventManagement />} />
          <Route path="create-event" element={<CreateEventOrganizer />} />
          <Route path="events-details/:id" element={<EventDetailsDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
