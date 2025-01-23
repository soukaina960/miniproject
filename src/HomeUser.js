import React, { useEffect, useState } from 'react';
import './HomeUser.css';
function HomeUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Récupérer l'utilisateur à partir du localStorage
    }
  }, []);

  return (
    <div className="container mt-5">
      {user ? (
        <>
          <h2>Bienvenue, Utilisateur {user.prenom}</h2>
          <p>Vous êtes connecté en tant qu'utilisateur.</p>
          <img src={user.photo} alt="Avatar utilisateur" />
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default HomeUser;
