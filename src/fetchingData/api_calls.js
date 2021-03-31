import { API } from "../config";

// Token is valid or not
export const validToken = (token) => {
  return fetch(`${API}/auth/verify/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
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
export const userData = (token) => {
  return fetch(`${API}/auth/userdata/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Update user for Profile
export const updateUser = (user, token) => {
  return fetch(`${API}/auth/userdata/${token}`, {
    method: "PUT",
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
      // console.log(err);
    });
};

// Post data to API for signup
export const addCS = (chargingD, token) => {
  // console.log(name,email, password);
  return fetch(`${API}/cs//newcs/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chargingD),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

// Get charging station data for station profile page
export const getCS = (token) => {
  return fetch(`${API}/cs/csdata/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

// Update charging station data for update statiopn profile page
export const updateCS = (chargingD, token) => {
  // console.log(name,email, password);
  return fetch(`${API}/cs/csdata/${token}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chargingD),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

// Delete charging station for admin dashboard
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
      // console.log(err);
    });
};

// Get all charging station for dashboard
export const getallCS = () => {
  return fetch(`${API}/cs/csall`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

//Get data from API for Dashboard
export const getDash = (token) => {
  return fetch(`${API}/dashboard/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log(err);
    });
};

//Getting all data for users to Admin Dashboard
export const getAllDash = (token) => {
  return fetch(`${API}/admin/allusers/${token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

// Updating the Admin dashboard
export const updateAdminUser = (user, token, user_id) => {
  return fetch(`${API}/auth/userdata/${token}?userid=${user_id}`, {
    method: "PUT",
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
      // console.log(err);
    });
};

// Sending an OTP to phone 
export const sendOTP = (phone) => {
  return fetch(`${API}/message/otpPhone/?h=user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phone }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};

// Verfiying OTP 
export const verifyOTP = (phone, otp) => {
  return fetch(`${API}/message/otpVerify?h=user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone: phone, otpToken: otp }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      // console.log(err);
    });
};
