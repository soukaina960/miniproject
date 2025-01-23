import React from 'react';
import { Link } from 'react-router-dom';

const Index = ({ user }) => {
  return (
    <div className="index-menu">
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/profile">Voir Mon Profile</Link></li>
        {user?.admin && (
          <>
            <li><Link to="/list-users">Liste des Utilisateurs</Link></li>
            <li><Link to="/add-user">Ajouter un Utilisateur</Link></li>
          </>
        )}
        {!user?.admin && (
          <>
            <li><Link to="/modifiercolor">Modifier Couleur</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Index;
