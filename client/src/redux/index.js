let initialState = {
  islogin: true,
};
function Redux(state = initialState, action) {
  switch (action.type) {
    case "login":
      // console.log("action:", action);
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
