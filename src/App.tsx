import "./App.css";

import { Route, Routes } from "react-router-dom";

import Bilan from "./pages/tableau_admin/bilan";
import Dashboard from "./pages/dashboard/dashboard";
import Home from "./pages/home/home";
import Inscription from "./pages/register/inscription";
import Login from "./pages/login/login";
import Paiements from "./pages/tableau_by_user/paiements";
import Profil from "./pages/profil/profil";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Inscription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/bilan" element={<Bilan />} />
        <Route path="/paiements" element={<Paiements />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
