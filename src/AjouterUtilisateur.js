import React, { useState } from 'react';

function AjouterUtilisateur() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { nom, prenom, email, password };
    
    const response = await fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
      alert('Utilisateur ajouté avec succès !');
    } else {
      alert('Erreur lors de l\'ajout de l\'utilisateur.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            className="form-control"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Ajouter</button>
      </form>
    </div>
  );
}

export default AjouterUtilisateur;
