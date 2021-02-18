let iniatialState = {
  islogin: true,
};
function Redux(state = iniatialState, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        islogin: action.payload,
      };
    default: {
      return state;
    }
  }
}

export default Redux;
