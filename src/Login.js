import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSlice'; // Action Redux pour stocker les données utilisateur
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Importer le fichier CSS
import CreateAccount from './CreateAccount'; // Composant pour créer un compte

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // État de chargement
  const [showCreateAccount, setShowCreateAccount] = useState(false); // État pour afficher ou masquer CreateAccount
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        const user = response.data.find(
          (u) => u.pseudo === username && u.MotDePasse === password
        );

        if (user) {
          dispatch(login(user)); // Stocker les infos utilisateur dans Redux
          alert('Connexion réussie !');
          navigate('/'); // Rediriger vers la page principale
        } else {
          setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      })
      .catch((error) => {
        console.error('Erreur réseau:', error);
        setErrorMessage('Une erreur s\'est produite. Veuillez réessayer plus tard.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="LOGIN">
      <h2>Connexion</h2>

      {/* Lien ou bouton pour afficher/masquer le composant CreateAccount */}
      <p
        className="create-account-link"
        onClick={() => setShowCreateAccount(!showCreateAccount)}
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      >
        {showCreateAccount ? 'Fermer la création de compte' : 'Créer un compte'}
      </p>

      {/* Affichage conditionnel de CreateAccount */}
      {showCreateAccount && <CreateAccount />}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {loading ? (
          <button type="button" disabled style={{ backgroundColor: 'grey' }}>
            Connexion en cours...
          </button>
        ) : (
          <button type="submit" style={{ backgroundColor: 'black' }}>
            Se connecter
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
