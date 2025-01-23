import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setDemandes, updateDemande } from './userSlice';

const AdminDemandes = () => {
  const dispatch = useDispatch();
  const demandes = useSelector((state) => state.user.demandes || []); // Toutes les demandes
  const [loading, setLoading] = useState(false); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  // Charger toutes les demandes au chargement du composant
  useEffect(() => {
    setLoading(true); // Commence à charger
    axios
      .get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        dispatch(setDemandes(response.data)); // Stocker les demandes dans Redux
        
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des demandes:', error);
        setError('Impossible de charger les demandes. Veuillez réessayer plus tard.');
      })
      .finally(() => {
        setLoading(false); // Arrête de charger
      });
  }, [dispatch]);

  // Fonction pour mettre à jour le statut d'une demande
  const handleUpdateStatus = (id, action) => {
    setLoading(true); // Indiquer le chargement pour l'action
    const url =
      action === 'approve'
        ? `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}/approve`
        : `https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}/reject`;

    axios
      .put(url)
      .then((response) => {
        dispatch(updateDemande(response.data)); // Mettre à jour la demande dans Redux
      })
      .catch((error) => {
        console.error(`Erreur lors de la mise à jour de la demande (${action}):`, error);
        setError('Une erreur est survenue lors de la mise à jour de la demande.');
      })
      .finally(() => {
        setLoading(false); // Arrête de charger
      });
  };

  if (loading) return <p>Chargement en cours...</p>; // Indicateur de chargement
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Afficher l'erreur

  return (
    <div>
      <h1>Gestion des Demandes</h1>

      {/* Table pour afficher les demandes */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
          {demandes.length > 0 ? (
            demandes.map((demande) => (
              <tr key={demande.id}>
                <td>{demande.titre}</td>
                <td>{demande.description}</td>
                <td>{demande.utilisateurId}</td>
                <td>{demande.status}</td>
                <td>
                  {demande.status !== 'Approuvée' && (
                    <button
                      style={{ marginRight: '10px' }}
                      onClick={() => handleUpdateStatus(demande.id, 'approve')}
                    >
                      Approuver
                    </button>
                  )}
                  {demande.status !== 'Rejetée' && (
                    <button onClick={() => handleUpdateStatus(demande.id, 'reject')}>
                      Rejeter
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune demande disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDemandes;
