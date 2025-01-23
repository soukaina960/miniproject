import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  // L'utilisateur est initialement null
  demandes: [], // Liste des demandes de l'utilisateur

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;  // Stocker l'utilisateur connecté
    },
    logout: (state) => {
      state.user = null;  // Réinitialiser l'utilisateur lors de la déconnexion
    },
    clearUser: (state) => {
      state.user = null;  // Clear the user info (optional, for specific use cases)
    },
    modifierColor: (state, action) => {
      if (state.user) {
        state.user.color = action.payload.color;  // Modifier la couleur de l'utilisateur
      }
    },
    setDemandes(state, action) {
      state.demandes = action.payload;
    },
    addDemande(state, action) {
      state.demandes.push(action.payload);
    },
    updateDemande(state, action) {
      const index = state.demandes.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.demandes[index] = action.payload;
      }
  }
}});

export const { login, logout, clearUser, modifierColor, setDemandes, addDemande, updateDemande } = userSlice.actions;

export default userSlice.reducer;
