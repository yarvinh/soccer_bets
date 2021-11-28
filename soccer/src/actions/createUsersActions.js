import axios from 'axios'

export const createUser = (user) => {
  
    return (dispatch) => {
        dispatch({ type: 'LOADING_NEW_USER'})
        axios.post('http://localhost:3000/users', user, {withCredentials: true})
        .then(response => {
         
          dispatch({ type: 'ADD_NEW_USER', user: response.data})
      })
    }
  }
