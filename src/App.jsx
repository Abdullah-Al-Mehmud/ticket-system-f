import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const PageLoading = lazy(() =>
  import("./components/common/loaderComponent/PageLoading")
);
const Home = lazy(() =>
  import("./components/pages/userManagementPages/publicPage/Home")
);
const UserLayout = lazy(() =>
  import("./components/layout/userLayout/UserLayout")
);
const Event = lazy(() =>
  import("./components/pages/userManagementPages/publicPage/EventPage/Event")
);

const Contact = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/ContactPage/Contact"
  )
);
const About = lazy(() =>
  import("./components/pages/userManagementPages/publicPage/AboutPage/About")
);
const TermsOfService = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/SupportPage/TermsOfService"
  )
);
const RefundPolicy = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/SupportPage/RefundPolicy"
  )
);
const HelpCenter = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/SupportPage/HelpCenter"
  )
);
const Careers = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/CompanyPage/Careers"
  )
);
const Press = lazy(() =>
  import("./components/pages/userManagementPages/publicPage/CompanyPage/Press")
);
const PrivacyPolicy = lazy(() =>
  import(
    "./components/pages/userManagementPages/publicPage/CompanyPage/PrivacyPolicy"
  )
);
const NotFound = lazy(() => import("./components/pages/authPage/NotFound"));
import EventDetailsPage from "./components/pages/userManagementPages/publicPage/EventPage/EventDetails";
import PublicRoute from "./components/layout/PublicRoute";
import Register from "./components/pages/authPage/Register";
import Login from "./components/pages/authPage/Login";
import PrivateRoute from "./components/layout/PrivateRoute";
import AdminLayout from "./components/layout/adminLayout/AdminLayout";
import AdminDashboard from "./components/pages/adminManagementPages/adminDashboardPage/AdminDashboard";
import UserList from "./components/pages/adminManagementPages/usersPage/UserList";
import UserCreate from "./components/pages/adminManagementPages/usersPage/UserCreate";
import UserEdit from "./components/pages/adminManagementPages/usersPage/UserEdit";
import UserProfile from "./components/pages/adminManagementPages/usersPage/UserProfile";
import CategoryList from "./components/pages/adminManagementPages/categoriesPage/CategoryList";
import CategoryCreate from "./components/pages/adminManagementPages/categoriesPage/CategoryCreate";
import CategoryEdit from "./components/pages/adminManagementPages/categoriesPage/CategoryEdit";
import CategoryDetails from "./components/pages/adminManagementPages/categoriesPage/CategoryDetails";
import EventsList from "./components/pages/adminManagementPages/eventsPage/Eventslist";
import EventsCreate from "./components/pages/adminManagementPages/eventsPage/EventsCreate";
import EventsEdit from "./components/pages/adminManagementPages/eventsPage/EventsEdit";
import EventsDetails from "./components/pages/adminManagementPages/eventsPage/EventsDetails";
import TicketsList from "./components/pages/adminManagementPages/ticketsPage/TicketsList";
import TicketsEdit from './components/pages/adminManagementPages/ticketsPage/TicketsEdit';
import TicketsDetails from './components/pages/adminManagementPages/ticketsPage/TicketsDetails';

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="event" element={<Event />} />
          <Route path="event-details/:id" element={<EventDetailsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="refund-policy" element={<RefundPolicy />} />
          <Route path="help-center" element={<HelpCenter />} />

          <Route path="careers" element={<Careers />} />
          <Route path="press" element={<Press />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />

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
            <Route path="user-create" element={<UserCreate />} />
            <Route path="user-edit/:id" element={<UserEdit />} />
            <Route path="user-profile/:id" element={<UserProfile />} />

            <Route path="categories-list" element={<CategoryList />} />
            <Route path="categories-create" element={<CategoryCreate />} />
            <Route path="categories-edit/:id" element={<CategoryEdit />} />
            <Route path="categories-details/:id" element={<CategoryDetails />} />

            <Route path="events-list" element={<EventsList />} />
            <Route path="events-create" element={<EventsCreate />} />
            <Route path="events-edit/:id" element={<EventsEdit />} />
            <Route path="events-details/:id" element={<EventsDetails />} />

            <Route path="tickets-list" element={<TicketsList />} />
            <Route path="tickets-edit/:id" element={<TicketsEdit />} />
            <Route path="tickets-details/:id" element={<TicketsDetails />} />
            {/* <Route path="tickets-create" element={<TicketsCreate />} /> */}
            
            {/* <Route path="ticket-categories" element={<TicketCategories />} /> */}
           {/* <Route
              path="ticket-categories/:id"
              element={<TicketCategoriesDetails />}
            />
            <Route
              path="ticket-categories/:id/edit"
              element={<TicketCategoriesUpdate />}
            /> */}
          </Route>
        </Route>

        {/* User Layout */}
        {/* <Route element={<PrivateRoute allowRole="user" />}>
          <Route path="/user" element={<Layout />}>
            <Route index element={<UserDashboard />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="user-view-ticket/:id" element={<UserViewTicket />} />
            <Route path="sales-overview/:id" element={<SalesOverview />} />
            <Route path="ticket-list/:id" element={<TicketList />} />
          </Route>
        </Route> */}

        {/* Organizer Layout */}
        {/* <Route element={<PrivateRoute allowRole="organizer" />}>
          <Route path="/organizer" element={<Layout />}>
            <Route path="dashboard" element={<OrganizerDashboard />} />
            <Route path="event-management" element={<EventManagement />} />
            <Route path="create-event" element={<CreateEventOrganizer />} />
            <Route
              path="events-details/:id"
              element={<EventDetailsDetails />}
            />
          </Route>
        </Route> */}

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
