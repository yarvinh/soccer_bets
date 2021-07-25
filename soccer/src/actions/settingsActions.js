import axios from 'axios'


export const fetchEditUser = (user) => {
   
  return (dispatch) => {
    dispatch({ type: 'LOADING_SETTINGS'})
  
      axios.patch(`http://localhost:3000/users/${user.user_id}`, {user}, {withCredentials: true})
      .then(response=> {
        dispatch({ type: 'EDITED_USER', user: response.data })
    
      })
    }
  
}