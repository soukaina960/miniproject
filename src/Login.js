import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSlice';  // Redux action to set user data
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Importer le fichier CSS spécifique pour Layout
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then(response => {
        const user = response.data.find(
          u => u.pseudo === username && u.MotDePasse === password
        );

        if (user) {
          // Dispatch action to store user info in Redux
          dispatch(login(user));
          alert('Connexion réussie !');
          navigate('/');  // Rediriger vers la page Layout
        } else {
          setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
  };

  return (
    <div className='LOGIN'>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom d'utilisateur" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit" style={{backgroundColor:'black'}}>Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
