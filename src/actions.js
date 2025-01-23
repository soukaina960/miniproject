// Action pour définir l'utilisateur dans le store
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  // Action pour effacer les informations de l'utilisateur lors de la déconnexion
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  // Action pour changer la couleur de l'utilisateur
  export const setColor = (color) => ({
    type: 'SET_COLOR',
    payload: color,
  });
  