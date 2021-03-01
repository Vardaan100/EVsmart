 const TOKEN_KEY = 'jwt';

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

//Creating token and local storage in the browser
export const authenticate = (data, next) => {
    if(typeof window !=='undefined' ) {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const getToken = (data) => {
  if(typeof window!== 'undefined'){
    localStorage.getItem('jwt');
    return true;
  }
  return false;
}
