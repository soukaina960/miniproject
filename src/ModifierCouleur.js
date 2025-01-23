import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifierColor } from './userSlice';  // Importer l'action de modification de la couleur

function ModifierCouleur() {
  const user = useSelector((state) => state.user.user);  // Récupérer l'utilisateur depuis Redux
  const dispatch = useDispatch();

  const [newColor, setNewColor] = useState(user?.color || '#ffffff');  // Valeur par défaut : couleur actuelle

  const handleColorChange = (e) => {
    setNewColor(e.target.value);
  };

  const handleSubmit = () => {
    // Dispatchez l'action pour modifier la couleur de l'utilisateur
    dispatch(modifierColor({ color: newColor }));
    alert('Couleur modifiée avec succès !');
  };

  return (
    <div>
      <h2>Modifier la couleur</h2>
      <select value={newColor} onChange={handleColorChange}>
        <option value="#ffffff">Blanc</option>
        <option value="#ff0000">Rouge</option>
        <option value="#00ff00">Vert</option>
        <option value="#0000ff">Bleu</option>
        {/* Ajoutez plus de couleurs si nécessaire */}
      </select>
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
}

export default ModifierCouleur;
