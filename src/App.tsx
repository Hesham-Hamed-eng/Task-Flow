
import { Routes, Route } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Members } from "./pages/Members";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ProjectNew } from "./pages/ProjectNew";
import { ProjectDetails } from "./pages/ProjectDetails";
import { ProjectEdit } from "./pages/ProjectEdit";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<ProjectNew />} />
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/members" element={<Members />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
