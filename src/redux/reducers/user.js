const initialState = {
  token: "",
  profile: {},
  user: {},
  question: {},
};
export default function drawerReducer(state = initialState, action) {
  // The reducer normally looks at the action type field to decide what happens
  switch (action.type) {
    case "LOGIN":
      const { token, profile } = action.payload;
      return {
        ...state,
        token: token,
        profile: profile,
      };
    case "LOGOUT":
      return {
        ...state,
        token: action.payload,
      };
    case "FORGOT-PASSWORD":
      return {
        ...state,
        user: action.payload,
      };
    case "QUESTION":
      return {
        ...state,
        question: action.payload,
      };
    default:
      return state;
  }
}
