import { API } from "../config";

// Post data to API for signup
export const signup = (user) => {
  // console.log(name,email, password);
  return fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Post data to API for signin
export const signin = (user) => {
  return fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get data from API for Profile
export const userData = (token) =>{
  return fetch(`${API}/auth/userdata/${token}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
    },
  })
  .then((response)=>{
    return response.json();
  })
  .catch((err)=> {
    console.log(err);
  });
}

export const updateUser = (user,token) =>{
  return fetch(`${API}/auth/userdata/${token}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .then((response)=>{
    console.log(response);
    return response.json();
  })
  .catch((err)=> {
    console.log(err);
  });
}




// Post data to API for signup
export const addCS = (chargingD,token) => {
  // console.log(name,email, password);
  return fetch(`${API}/cs//newcs/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCS = (chargingD,token) => {
  // console.log(name,email, password);
  return fetch(`${API}/cs/csdata/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chargingD),
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCS = (token) => {
  return fetch(`${API}/cs/deletecs/${token}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const getallCS = () =>{
  return fetch(`${API}/cs/csall`,{
    method:"GET",
    headers:{
      Accept:"application/json",
    },
  })
  .then((response)=>{
    console.log(response);
    return response.json();
  })
  .catch((err)=> {
    console.log(err);
  });
}

//Get data from API for Profile
export const getDash = (token) =>{
  return fetch(`${API}/dashboard/${token}`,{
    method:"GET",
    headers:{
      Accept:"application/json",
    },
  })
  .then((response)=>{
    return response;
  })
  .catch((err)=> {
    console.log(err);
  });
}