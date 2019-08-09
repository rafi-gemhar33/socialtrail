const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || '',
  isAuthInProgress: true
}

function currentUser(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.data,
        isAuthInProgress: false
      }
    
    case 'USER_LOGIN_FAILED','LOG_OUT' :
      localStorage.setItem("jwt", "");
      return {
        ...state,
        isAuthInProgress: false,
        user: null
      }

    case 'NO_TOKEN':
      return {
        ...state,
        user: null,
        isAuthInProgress: false,
        token: ''
      }
    default:
      return state;
  }
}

export default currentUser;