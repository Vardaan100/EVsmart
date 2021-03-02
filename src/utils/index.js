 const TOKEN_KEY = 'jwt';

export const authenticate = (data) => {
  if(typeof window !=='undefined' ) {
      localStorage.setItem(TOKEN_KEY , JSON.stringify(data));
      console.log("Setting token");
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const getToken = () => {
  if(localStorage.getItem(TOKEN_KEY)){
    return true;
  }
  return false;
}


