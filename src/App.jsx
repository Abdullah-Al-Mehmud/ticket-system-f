import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts
import Layout from "./components/Layout";
import AdminLayout from "./Layout/AdminLayout";

// Auth wrappers
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import PageLoading from "./components/LoaderComponent/PageLoading";


// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const Event = lazy(() => import("./pages/Public/Event/Event"));
const EventDetails = lazy(() => import("./pages/Public/Event/EventDetails"));

const NotFound = lazy(() => import("./pages/Notfound"));

const AdminDashboard = lazy(() => import("./pages/Dashboard/AdminDashboard"));
const UserList = lazy(() => import("./pages/User/UserList"));
const CreateUser = lazy(() => import("./pages/User/CreateUser"));
const UserProfilePage = lazy(() => import("./pages/User/UserProfilePage"));
const UserEditForm = lazy(() => import("./pages/User/UserEditForm"));

const CategoriesList = lazy(() => import("./pages/Categories/CategoriesList"));
const CategoryForm = lazy(() => import("./pages/Categories/CategoryForm"));
const ViewCategoryDetails = lazy(() => import("./pages/Categories/ViewCategoryDetails"));
const CategoryUpdate = lazy(() => import("./pages/Categories/CategoryUpdate"));

const AllEventslist = lazy(() => import("./pages/Events/AllEventslist"));
const EventForm = lazy(() => import("./pages/Events/EventForm"));
const ViewEventsDetails = lazy(() => import("./pages/Events/ViewEventsDetails"));
const EventEditForm = lazy(() => import("./pages/Events/EventEditForm"));

const TicketsList = lazy(() => import("./pages/Tickets/TicketsList"));
const TicketsForm = lazy(() => import("./pages/Tickets/TicketsForm"));
const TicketsUpdate = lazy(() => import("./pages/Tickets/TicketsUpdate"));
const ViewTicketsDetails = lazy(() => import("./pages/Tickets/ViewTicketsDetails"));

const TicketCategories = lazy(() => import("./pages/TicketCategories/TicketCategories"));
const TicketCategoriesDetails = lazy(() => import("./pages/TicketCategories/TicketCategoriesDetails"));
const TicketCategoriesUpdate = lazy(() => import("./pages/TicketCategories/TicketCategoriesUpdate"));

const UserDashboard = lazy(() => import("./pages/Dashboard/UserDashboard/UserDashboard"));
const UserViewTicket = lazy(() => import("./pages/Dashboard/UserDashboard/TicketManagement/UserViewTicket"));

const OrganizerDashboard = lazy(() => import("./pages/Dashboard/OrganizerDashboard/OrganizerDashboard"));
const EventManagement = lazy(() => import("./pages/Dashboard/OrganizerDashboard/EventManagement"));
const CreateEventOrganizer = lazy(() => import("./pages/Dashboard/OrganizerDashboard/CreateEventOrganizer"));
const EventDetailsDetails = lazy(() => import("./pages/Dashboard/OrganizerDashboard/EventDetailsDetails"));

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
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

        {/* Admin Layout */}
        <Route element={<PrivateRoute allowRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-list" element={<UserList />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="user-profile/:id" element={<UserProfilePage />} />
            <Route path="edit/:id" element={<UserEditForm />} />
            <Route path="categories" element={<CategoriesList />} />
            <Route path="create-category" element={<CategoryForm />} />
            <Route path="categories/:id" element={<ViewCategoryDetails />} />
            <Route path="categories/edit/:id" element={<CategoryUpdate />} />
            <Route path="events" element={<AllEventslist />} />
            <Route path="create-event" element={<EventForm />} />
            <Route path="events-details/:id" element={<ViewEventsDetails />} />
            <Route path="event-edit/:id" element={<EventEditForm />} />
            <Route path="tickets" element={<TicketsList />} />
            <Route path="tickets/create-ticket" element={<TicketsForm />} />
            <Route path="tickets/edit/:id" element={<TicketsUpdate />} />
            <Route path="tickets/:id" element={<ViewTicketsDetails />} />
            <Route path="ticket-categories" element={<TicketCategories />} />
            <Route path="ticket-categories/:id" element={<TicketCategoriesDetails />} />
            <Route path="ticket-categories/:id/edit" element={<TicketCategoriesUpdate />} />
          </Route>
        </Route>

        {/* User Layout */}
        <Route element={<PrivateRoute allowRole="user" />}>
          <Route path="/user" element={<Layout />}>
            <Route index element={<UserDashboard />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="user-view-ticket/:id" element={<UserViewTicket />} />
          </Route>
        </Route>

        {/* Organizer Layout */}
        <Route element={<PrivateRoute allowRole="organizer" />}>
          <Route path="/organizer" element={<Layout />}>
            <Route path="dashboard" element={<OrganizerDashboard />} />
            <Route path="event-management" element={<EventManagement />} />
            <Route path="create-event" element={<CreateEventOrganizer />} />
            <Route path="events-details/:id" element={<EventDetailsDetails />} />
          </Route>
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
