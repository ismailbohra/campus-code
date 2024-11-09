import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Main/LandingPage";
import SignIn from "./pages/Auth/signin";
import SignUp from "./pages/Auth/signup";
import AdminPage from "./pages/Admin/Admin";
import Home from "./pages/Admin/Home";
import ProjectsPage from "./pages/Admin/Projects/Projects";
import AddProjectPage from "./pages/Admin/Projects/Addproject";
import ClientListPage from "./pages/Admin/client/ClientList";
import AddClientPage from "./pages/Admin/client/AddClient";
import ContactFormResponsesPage from "./pages/Admin/contacts/ContactPage";
import PrivateRoute from "./component/privateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="add-project" element={<AddProjectPage />} />
          <Route path="clients" element={<ClientListPage />} />
          <Route path="add-client" element={<AddClientPage />} />
          <Route path="contactFormResponse" element={<ContactFormResponsesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
