import React from 'react';

const NavigationBar = ({ user, onMenuClick }) => {
  return (
    <div className="navigation-bar">
      <ul>
        <li>
          <a onClick={() => onMenuClick('home')}>Accueil</a>
        </li>
        {user?.admin && (
          <>
            <li>
              <a onClick={() => onMenuClick('adminDemandes')}>Demandes Admin</a>
            </li>
            <li>
              <a onClick={() => onMenuClick('listUsers')}>Liste des utilisateurs</a>
            </li>
            <li>
              <a onClick={() => onMenuClick('addUser')}>Ajouter un utilisateur</a>
            </li>
          </>
        )}
        {!user?.admin && (
          <li>
            <a onClick={() => onMenuClick('visiteurDemandes')}>Mes Demandes</a>
          </li>
        )}
        <li>
          <a onClick={() => onMenuClick('profile')}>Mon Profil</a>
        </li>
        <li>
          <a onClick={() => onMenuClick('modifierColor')}>Modifier Couleur</a>
        </li>
        
      </ul>
    </div>
  );
};

export default NavigationBar;
