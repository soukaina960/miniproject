import React from 'react';
import { useSelector } from 'react-redux';

const VoirMonProfile = () => {
  const user = useSelector((state) => state.user.user);  // Récupérer l'utilisateur depuis Redux

  return (
    <div className="profile" >
      <h2>Mon Profil</h2>
      <p style={{color:'black'}}><strong>Nom:</strong> {user?.nom || 'Non disponible'}</p>
      <p style={{color:'black'}}><strong>Email:</strong> {user?.email || 'Non disponible'}</p>
      <p style={{color:'black'}}><strong>Couleur de fond:</strong> {user?.couleur || 'Non défini'}</p>
    </div>
  );
};

export default VoirMonProfile;
