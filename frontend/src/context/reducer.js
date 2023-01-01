export const actionTypes = {
  SET_USER: "SET_USER",
  SET_USERS: "SET_USERS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      };

    default:
      return state;
  }
};

export default reducer;
