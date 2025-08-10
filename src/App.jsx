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
            {/* <Route path="categories" element={<CategoriesList />} />
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
            <Route path="ticket-categories" element={<TicketCategories />} /> */}
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
