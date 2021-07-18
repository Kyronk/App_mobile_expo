const initialState = {
   loading: false,
};
export default function loadingReducer(state = initialState, action) {
   // The reducer normally looks at the action type field to decide what happens
   switch (action.type) {
      case "LOADING":
         return {
            ...state,
            loading: action.payload,
         };
      // Do something here based on the different types of actions
      default:
         // If this reducer doesn't recognize the action type, or doesn't
         // care about this specific action, return the existing state unchanged
         return state;
   }
}
