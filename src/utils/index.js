 const TOKEN_KEY = 'jwt';

// export const logout = () => {
//     localStorage.removeItem(TOKEN_KEY);
// }

export const authenticate = (data) => {
  if(typeof window !=='undefined' ) {
      localStorage.setItem('jwt', JSON.stringify(data));
      console.log("Setting token");
  }
};

// //Creating token and local storage in the browser
// export const authenticated = (data, next) => {
//     if(typeof window !=='undefined' ) {
//         localStorage.setItem('jwt', JSON.stringify(data));
//         next();
//     }
// };

export const getToken = (data) => {
  if(typeof window!== 'undefined'){
    localStorage.getItem('jwt');
  }
}