
import axios from 'axios'






export const fetchLoginLogOut = (user,type) => {
  return (dispatch) => {
    dispatch({ type: type})
    if (type === 'LOADING_LOGIN'){
      axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
      .then(response=> {
     
          dispatch({ type: 'LOGIN', user: response.data })
    
      })

    } else if(type === 'LOADING_LOGOUT') {
      axios.post('http://localhost:3000/signout', {user}, {withCredentials: true})
      .then(response => {
        dispatch({ type: 'LOGOUT', user: response.data })
      })
    }
  }
}



