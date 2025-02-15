import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    admin: false,
    MotDePasse: '',
    confirmPassword: '',
    pseudo: '',
    couleur: '',
    Devise: '',
    Pays: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validatePassword = (password) => {
    const regex = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };
    return (
      regex.uppercase.test(password) &&
      regex.lowercase.test(password) &&
      regex.number.test(password) &&
      regex.specialChar.test(password) &&
      password.length >= 8
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validation des champs obligatoires
    for (const key in formData) {
      if (!formData[key] && key !== 'admin') {
        validationErrors[key] = `Le champ "${key}" est requis.`;
      }
    }

    // Validation du mot de passe
    if (!validatePassword(formData.MotDePasse)) {
      validationErrors.MotDePasse =
        'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.';
    }

    // Validation de confirmation du mot de passe
    if (formData.MotDePasse !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newUser = { ...formData };
      delete newUser.confirmPassword;

      await axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', newUser);

      setSuccessMessage('Compte créé avec succès ! Redirection vers la page de connexion...');
      setTimeout(() => {
        navigate('/login'); // Rediriger vers la page Login
      }, 3000);
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
      setErrors({ general: 'Une erreur est survenue lors de la création du compte.' });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Nom', name: 'nom', type: 'text' },
          { label: 'Prénom', name: 'prenom', type: 'text' },
          { label: 'Âge', name: 'age', type: 'number' },
          { label: 'Pseudo', name: 'pseudo', type: 'text' },
          { label: 'Pays', name: 'Pays', type: 'text' },
          { label: 'Couleur Préférée', name: 'couleur', type: 'text' },
          { label: 'Devise', name: 'Devise', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Mot de passe', name: 'MotDePasse', type: 'password' },
          { label: 'Confirmer le mot de passe', name: 'confirmPassword', type: 'password' }
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type}
              className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
            {errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
          </div>
        ))}

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
          <label className="form-check-label">Admin</label>
        </div>

        {errors.general && <p className="text-danger">{errors.general}</p>}

        <button type="submit" className="btn btn-primary">
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default CreateAccount;
