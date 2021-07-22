export const fetchGames = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_GAMES'})
      fetch('http://localhost:3000/games').then(response => {
        return response.json()
      }).then(responseJSON => {
          dispatch({ type: 'ADD_GAMES', games: responseJSON })
      })
    }
  }
  



  export const  dispatchSetFilter = (payload) => {
      return ({ type: 'SET_FILTER', filterBy: payload })
  }