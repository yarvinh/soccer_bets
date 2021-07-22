
import axios from 'axios'






export const fetchLoginLogOut = (user,type) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_LOGIN'})
    if (type === 'login'){
      axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response=> {
          dispatch({ type: 'LOGIN', user: response })
    
      })

    } else if(type === 'signout') {
      axios.post('http://localhost:3000/signout', {user}, {withCredentials: true})
      .then(response => {
      
        dispatch({ type: 'LOGOUT', user: response })
      })
    }
  }
}



