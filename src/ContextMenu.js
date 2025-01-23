import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from './userSlice'; // Action pour effacer l'utilisateur
import { useNavigate } from 'react-router-dom';

const ContextMenu = () => {
  const user = useSelector((state) => state.user.user);  // Utilisateur depuis Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  // Gérer le clic droit
  const handleContextMenu = (event) => {
    event.preventDefault();  // Empêcher le menu contextuel par défaut du navigateur
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowMenu(true);
  };

  // Gérer les clics en dehors du menu pour le fermer
  const handleClick = () => {
    setShowMenu(false);
  };

  // Ajouter un événement pour fermer le menu lorsqu'on clique ailleurs
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Actions de menu
  const handleMenuItemClick = (action) => {
    switch (action) {
      case 'home':
        // Afficher l'accueil
        break;
      case 'profile':
        // Afficher le profil
        break;
      case 'modifierColor':
        // Afficher modifier couleur
        break;
      case 'logout':
        dispatch(clearUser());
        navigate('/login');
        break;
      default:
        break;
    }
    setShowMenu(false);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ height: '100vh', background: '#f5f5f5' }}>
      <h2>Clic droit sur cette zone pour afficher le menu</h2>

      {/* Affichage du menu contextuel */}
      {showMenu && (
        <div
          style={{
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x,
            background: 'white',
            border: '1px solid #ccc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyleType: 'none', padding: '10px', margin: 0 }}>
            <li
              onClick={() => handleMenuItemClick('home')}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              Accueil
            </li>
            <li
              onClick={() => handleMenuItemClick('profile')}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              Voir Mon Profil
            </li>
            <li
              onClick={() => handleMenuItemClick('modifierColor')}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              Modifier Couleur
            </li>
            <li
              onClick={() => handleMenuItemClick('logout')}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              Déconnexion
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
