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
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, ...action.payload };
      case 'LOGOUT':
        return { ...initialState };
      case 'SET_COLOR':
        return { ...state, couleur: action.payload };
      default:
        return state;
    }
  };
  
  export default reducer;
  