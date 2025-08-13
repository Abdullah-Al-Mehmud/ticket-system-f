import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScannersEvent from "./components/pages/userManagementPages/eventManagementPage/ScannersEvent";
const PageLoading = lazy(() => import("./components/common/loaderComponent/PageLoading"));
const Home = lazy(() => import("./components/pages/userManagementPages/publicPage/Home"));
const UserLayout = lazy(() => import("./components/layout/userLayout/UserLayout"));
const Event = lazy(() => import("./components/pages/userManagementPages/publicPage/EventPage/Event"));
const Contact = lazy(() => import("./components/pages/userManagementPages/publicPage/ContactPage/Contact"));
const About = lazy(() => import("./components/pages/userManagementPages/publicPage/AboutPage/About"));
const TermsOfService = lazy(() => import("./components/pages/userManagementPages/publicPage/SupportPage/TermsOfService"));
const RefundPolicy = lazy(() => import("./components/pages/userManagementPages/publicPage/SupportPage/RefundPolicy"));
const HelpCenter = lazy(() => import("./components/pages/userManagementPages/publicPage/SupportPage/HelpCenter"));
const Careers = lazy(() => import("./components/pages/userManagementPages/publicPage/CompanyPage/Careers"));
const Press = lazy(() => import("./components/pages/userManagementPages/publicPage/CompanyPage/Press"));
const PrivacyPolicy = lazy(() => import("./components/pages/userManagementPages/publicPage/CompanyPage/PrivacyPolicy"));
const NotFound = lazy(() => import("./components/pages/authPage/NotFound"));
const EventDetailsPage = lazy(() => import("./components/pages/userManagementPages/publicPage/EventPage/EventDetails"));
const PublicRoute = lazy(() => import("./components/layout/PublicRoute"));
const Register = lazy(() => import("./components/pages/authPage/Register"));
const Login = lazy(() => import("./components/pages/authPage/Login"));
const PrivateRoute = lazy(() => import("./components/layout/PrivateRoute"));
const AdminLayout = lazy(() => import("./components/layout/adminLayout/AdminLayout"));
const AdminDashboard = lazy(() => import("./components/pages/adminManagementPages/adminDashboardPage/AdminDashboard"));

const UserList = lazy(() => import("./components/pages/adminManagementPages/usersPage/UserList"));
const UserCreate = lazy(() => import("./components/pages/adminManagementPages/usersPage/UserCreate"));
const UserEdit = lazy(() => import("./components/pages/adminManagementPages/usersPage/UserEdit"));
const UserProfile = lazy(() => import("./components/pages/adminManagementPages/usersPage/UserProfile"));

const CategoryList = lazy(() => import("./components/pages/adminManagementPages/categoriesPage/CategoryList"));
const CategoryCreate = lazy(() => import("./components/pages/adminManagementPages/categoriesPage/CategoryCreate"));
const CategoryEdit = lazy(() => import("./components/pages/adminManagementPages/categoriesPage/CategoryEdit"));
const CategoryDetails = lazy(() => import("./components/pages/adminManagementPages/categoriesPage/CategoryDetails"));

const EventsList = lazy(() => import("./components/pages/adminManagementPages/eventsPage/EventsList"));
const EventsCreate = lazy(() => import("./components/pages/adminManagementPages/eventsPage/EventsCreate"));
const EventsEdit = lazy(() => import("./components/pages/adminManagementPages/eventsPage/EventsEdit"));
const EventsDetails = lazy(() => import("./components/pages/adminManagementPages/eventsPage/EventsDetails"));

const TicketsList = lazy(() => import("./components/pages/adminManagementPages/ticketsPage/TicketsList"));
const TicketsEdit = lazy(() => import("./components/pages/adminManagementPages/ticketsPage/TicketsEdit"));
const TicketsDetails = lazy(() => import("./components/pages/adminManagementPages/ticketsPage/TicketsDetails"));

const TicketCategoriesList = lazy(() => import("./components/pages/adminManagementPages/ticketCategoriesPage/TicketCategoriesList"));
const TicketCategoriesDetails = lazy(() => import("./components/pages/adminManagementPages/ticketCategoriesPage/TicketCategoriesDetails"));
const TicketCategoriesEdit = lazy(() => import("./components/pages/adminManagementPages/ticketCategoriesPage/TicketCategoriesEdit"));

const UserDashboard = lazy(() => import("./components/pages/userManagementPages/userDashboardPage/UserDashboard"));
const BookingTicketDetails = lazy(() => import("./components/pages/userManagementPages/ticketManagement/BookingTicketDetails"));
const EventSalesOverview = lazy(() => import("./components/pages/userManagementPages/eventManagementPage/EventSalesOverview"));
const EventTicketList = lazy(() => import("./components/pages/userManagementPages/eventManagementPage/EventTicketList"));

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

            <Route path="ticket-categories-list" element={<TicketCategoriesList />} />
            <Route path="ticket-categories-details/:id" element={<TicketCategoriesDetails />} />
            <Route path="ticket-categories-edit/:id" element={<TicketCategoriesEdit />} />
          </Route>
        </Route>

        {/* User Layout */}
        <Route element={<PrivateRoute allowRole="user" />}>
          <Route path="/user" element={<UserLayout />}>
            {/* <Route index element={<UserDashboard />} /> */}
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="booking-ticket-details/:id" element={<BookingTicketDetails />} />

            <Route path="events-sales-overview/:id" element={<EventSalesOverview />} />
            <Route path="events-ticket-list/:id" element={<EventTicketList />} />
            <Route path="scanners-event/:id" element={<ScannersEvent />} />

          </Route>
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
