import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDemandes, addDemande } from './userSlice';

const VisiteurDemandes = () => {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.user.demandes); // Liste des demandes
  const user = useSelector((state) => state.user.user); // Utilisateur connecté

  const [newDemande, setNewDemande] = useState({
    titre: '',
    description: '',
  });

  // Charger les demandes au chargement du composant
  useEffect(() => {
    if (user) {
      axios
        .get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
        .then((response) => {
          const userDemandes = response.data.filter((d) => d.utilisateurId === user.id);
          dispatch(setDemandes(userDemandes)); // Enregistre les demandes dans Redux
        })
        .catch((error) => console.error('Erreur lors du chargement des demandes :', error));
    }
  }, [dispatch, user]);

  // Ajouter une nouvelle demande
  const handleAddDemande = () => {
    if (!newDemande.titre || !newDemande.description) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const demande = {
      ...newDemande,
      utilisateurId: user.id,
      status: 'En attente',
      createdAt: new Date().toISOString(),
    };

    axios
      .post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', demande)
      .then((response) => {
        dispatch(addDemande(response.data)); // Ajouter la demande dans Redux
        setNewDemande({ titre: '', description: '' }); // Réinitialiser le formulaire
      })
      .catch((error) => console.error('Erreur lors de l\'ajout de la demande :', error));
  };

  return (
    <div>
      <h1>Mes Demandes</h1>

      {/* Formulaire pour ajouter une demande */}
      <div>
        <h2>Ajouter une nouvelle demande</h2>
        <input
          type="text"
          placeholder="Titre"
          value={newDemande.titre}
          onChange={(e) => setNewDemande({ ...newDemande, titre: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newDemande.description}
          onChange={(e) => setNewDemande({ ...newDemande, description: e.target.value })}
        />
        <button onClick={handleAddDemande}>Ajouter</button>
      </div>

      {/* Liste des demandes */}
      <div>
        <h2>Liste des demandes</h2>
        <ul>
          {demandes.map((demande) => (
            <li key={demande.id}>
              <strong>{demande.titre}</strong> - {demande.status}
              <p>{demande.description}</p>
              <p>Créée le : {new Date(demande.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VisiteurDemandes;
