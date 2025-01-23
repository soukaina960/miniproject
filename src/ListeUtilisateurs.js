import React, { useEffect, useState } from 'react';

function Listeusers() {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des users');
        }
        const data = await response.json();
        setusers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchusers();
  }, []);

  const handleModifier = (id) => {
    console.log(`Modifier l'user avec l'ID: ${id}`);
    // Ajoutez ici la logique pour modifier l'user
  };

  const handleSupprimer = (id) => {
    console.log(`Supprimer l'user avec l'ID: ${id}`);
    // Ajoutez ici la logique pour supprimer l'user
    // Vous pouvez appeler une API pour supprimer l'user
    setusers(users.filter(user => user.id !== id));
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Liste des users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nom} {user.prenom}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleModifier(user.id)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => handleSupprimer(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listeusers;
