export const dispatchBets = (params) =>{
    return (dispatch) => {
    dispatch({ type: 'LOADING_GAME_BETS'})
    fetch(`http://localhost:3000/bets`,
     { 
 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      dispatch({ type: 'ADD_GAME_BETS', games: response })
    })
    
  }
}