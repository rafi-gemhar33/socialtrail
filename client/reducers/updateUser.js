
const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || '',
  isAuthInProgress: true
};

function updateUser(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_USER_SUCCESS':
      console.log(action.data);
      
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
}

export default updateUser;
