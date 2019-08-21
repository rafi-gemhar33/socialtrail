
const initialState = {
  user: null,
  token: localStorage.getItem('authToken') || '',
  isAuthInProgress: true
};

function updateUser(state = initialState, action) {
  // console.log("in reducer...123",action );
  
  // switch (action.type) {
  //   case 'UPDATE_USER_SUCCESS':
  //     console.log("in reducer...456",action );
  //     return {
  //       ...state,
  //       user: action.data
  //     };
  //   default:
  //     return state;
  // }
}

export default updateUser;
