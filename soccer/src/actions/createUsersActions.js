import axios from 'axios'

export const createUser = (user) => {
  
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.post('http://localhost:3000/users', user, {withCredentials: true})
        .then(response => {
          console.log('response from create user',response)
          dispatch({ type: 'ADD_USER', user: response})
      })
    }
  }
