import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Pour redirection
import { clearUser } from './userSlice';  // Action pour effacer l'utilisateur dans Redux
import HeaderSection from './HeaderSection';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import HomeAdmin from './HomeAdmin';
import HomeUser from './HomeUser';
import ModifierCouleur from './ModifierCouleur';
import VoirMonProfile from './VoirMonProfile';
import ListeUtilisateurs from './ListeUtilisateurs';
import AjouterUtilisateur from './AjouterUtilisateur';
import AdminDemandes from './adminDemandes';
import VisiteurDemandes from './VisiteurDemandes';
import './layout.css'; // Importer le CSS spécifique

const Layout = () => {
  const user = useSelector((state) => state.user.user);  // Informations de l'utilisateur connecté
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState('home'); // Section par défaut

  // Déconnexion de l'utilisateur
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');  // Redirection vers la page de connexion
  };

  const handleMenuClick = (section) => {
    setSelectedSection(section); // Mettre à jour la section active
  };

  return (
    <div style={{ backgroundColor: user?.color || '#ffffff' }}>
      <HeaderSection user={user} onLogout={handleLogout} />

      <div className="msg">
        {/* Barre de navigation */}
        <NavigationBar user={user} onMenuClick={handleMenuClick} />

        {/* Contenu principal */}
        <div
          className="content-section"
          style={{
            width: '60%',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            marginTop:'-300px'
          }}
        >
          {/* Rendu conditionnel des sections */}
          {selectedSection === 'home' && (
            <div>
              <h2>Bienvenue sur votre tableau de bord, {user?.prenom} !</h2>
              <p>Sélectionnez une section dans le menu pour commencer.</p>
            </div>
          )}
          {selectedSection === 'homeAdmin' && user?.admin && <HomeAdmin />}
          {selectedSection === 'homeUser' && !user?.admin && <HomeUser />}
          {selectedSection === 'profile' && <VoirMonProfile />}
          {selectedSection === 'modifierColor' && <ModifierCouleur />}
          {selectedSection === 'listUsers' && user?.admin && <ListeUtilisateurs />}
          {selectedSection === 'addUser' && user?.admin && <AjouterUtilisateur />}
          {selectedSection === 'adminDemandes' && user?.admin && <AdminDemandes />}
          {selectedSection === 'visiteurDemandes' && !user?.admin && <VisiteurDemandes />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
