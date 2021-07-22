import axios from 'axios'


  export const fetchCurrentUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.get('http://localhost:3000/islogged_in', 
        {withCredentials: true})    
        .then(response => {
            dispatch({ type: 'ADD_USER', data: response.data})
        })
        .catch(error => console.log('api errors:', error))

    }

  }