import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDemandes, updateDemande } from './userSlice';

const AdminDemandes = () => {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.user.demandes || []); // Toutes les demandes

  // Charger toutes les demandes au chargement du composant
  useEffect(() => {
    axios
      .get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        dispatch(setDemandes(response.data)); // Stocker les demandes dans Redux
      })
      .catch((error) => console.error('Erreur lors du chargement des demandes:', error));
  }, [dispatch]);

  // Fonction pour mettre à jour le statut d'une demande
  const handleUpdateStatus = (id, newStatus) => {
    axios
      .put(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, { status: newStatus })
      .then((response) => {
        dispatch(updateDemande(response.data)); // Mettre à jour la demande dans Redux
      })
      .catch((error) => console.error('Erreur lors de la mise à jour de la demande:', error));
  };

  return (
    <div>
      <h1>Gestion des Demandes</h1>

      {/* Table pour afficher les demandes */}
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Utilisateur</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.titre}</td>
              <td>{demande.description}</td>
              <td>{demande.utilisateurId}</td>
              <td>{demande.status}</td>
              <td>
                {demande.status !== 'Approuvée' && (
                  <button onClick={() => handleUpdateStatus(demande.id, 'Approuvée')}>
                    Approuver
                  </button>
                )}
                {demande.status !== 'Rejetée' && (
                  <button onClick={() => handleUpdateStatus(demande.id, 'Rejetée')}>
                    Rejeter
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDemandes;
