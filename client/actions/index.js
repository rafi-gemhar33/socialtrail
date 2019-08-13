// import axios from 'axios';
const url = 'http://localhost:3000/api/v1';

// const setTokenToAxios = (token) => {
//   const newToken = localStorage.getItem('authToken') || '';
//   axios.defaults.headers.Authorization = newToken;
// }

export const getCurrentUser = (token, history) => {
  // console.log(history, "action history");
  return (dispatch => {
    fetch(`${url}/users/me`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        dispatch({
          type: 'USER_LOGIN_SUCCESS',
          data
        });
        history.push('/');
      }
    })
    .catch(err => {
      console.log(err, "action error");
      dispatch({type: 'USER_LOGIN_FAILED'})
    })
  })
}

// export const noToken = () => {
//   return(dispatch => {
//     dispatch({
//       type: 'NO_TOKEN'
//     })
//   })
// }