import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import Login from './Login';
import VoirMonProfile from './VoirMonProfile';
import ModifierCouleur from './ModifierCouleur';
import LogoFetcher from './HeaderSection';
import VisiteurDemandes from './VisiteurDemandes';
import AdminDemandes from './adminDemandes';
function App() {
  const user = useSelector((state) => state.user.user);  // Vérifie si un utilisateur est connecté

  return (
    <Router>
      <Routes>
        {/* Si l'utilisateur est connecté, redirige vers Layout */}
        <Route path="/" element={user ? <Layout /> : <Login />} />
        
        {/* Route vers Login */}
        <Route path="/login" element={<Login />} />

        {/* Autres routes */}
        <Route path="/home" element={<Layout />} />
        <Route path="/profile" element={<VoirMonProfile />} />
        <Route path="/modifier-couleur" element={<ModifierCouleur />} />
        <Route path="/Logo-Fetcher" element={<LogoFetcher />} />
        <Route path="/demandes" element={<VisiteurDemandes />} />
        <Route path="/AdminDemandes" element={<AdminDemandes />} />
      </Routes>
    </Router>
  );
}

export default App;
