import React from 'react';
import { useSelector } from 'react-redux';
function HomeAdmin() {
  const user = useSelector((state) => state.user.user); 

  return (
    <div >
      <h3>Bienvenue dans l'interface Administrateur</h3>
     <h1> <strong>{user.nom}  { user.prenom}</strong> </h1>
    </div>
  );
}

export default HomeAdmin;
