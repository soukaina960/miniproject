import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  nom: "Funk",
  age: "4",
  admin: false,
  MotDePasse: "e2EpziAy5RIpJgP",
  pseudo: "Kaci_Reilly73",
  prenom: "Rose",
  couleur: "maroon",
  Devise: "kr",
  Pays: "Spain",
  avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/831.jpg",
  email: "Wade34@yahoo.com",
  photo: "https://loremflickr.com/640/480/people",
  id: "8",
  demandes: [], // Ajouter un tableau pour les demandes
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return initialState;
    case 'CHANGE_COLOR':
      return { ...state, couleur: action.payload };
    case 'ADD_DEMANDE':
      return { ...state, demandes: [...state.demandes, action.payload] };
    case 'UPDATE_DEMANDE':
      return {
        ...state,
        demandes: state.demandes.map(demande =>
          demande.id === action.payload.id ? action.payload : demande
        ),
      };
    case 'DELETE_DEMANDE':
      return {
        ...state,
        demandes: state.demandes.filter(demande => demande.id !== action.payload),
      };
    default:
      return state;
  }
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, setBackgroundColor, logout } = appSlice.actions;



