import {API} from '../config';

// Post data to API for signup
export const signup = (user) => {
    // console.log(name,email, password);
    return fetch(`${API}/auth/signup`, {
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(error =>{
        console.log(error);
    })
};