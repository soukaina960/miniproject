import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './userSlice'; // Action pour réinitialiser l'utilisateur
import './App.css'
const LogoFetcher = () => {
  const user = useSelector((state) => state.user.user); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
      dispatch(logout()); // Réinitialise l'utilisateur dans Redux
      navigate('/login'); // Redirige vers la page de connexion
  
    }
  return (
    <header>
      <div style={{display:'flex',flexDirection:'column'}}>
        <div className="profile">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          ) : (
            <p><strong>Nom:</strong> Non disponible</p>
          )}
          <button onClick={handleLogout}>Se Déconnecter</button>
        </div>
      </div>
    </header>
  );
};

export default LogoFetcher;