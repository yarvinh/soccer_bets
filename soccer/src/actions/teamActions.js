export const fetchTeams = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_TEAMS'})
      fetch('http://localhost:3000/teams').then(response => {
        return response.json()
      }).then(responseJSON => {
         dispatch({ type: 'ADD_TEAMS', teams: responseJSON })
      })
    }
  }