export const dispatchLikes = (params) =>{
    return (dispatch) => {
    dispatch({ type: 'LOADING_GAME_LIKES'})
    fetch(`http://localhost:3000/likes`,
             { 
 
      method: "POST", 
      headers: { "Content-type": "application/json"  , "Accept": "application/json"

     }, 
     body: JSON.stringify(params)
   }
    ).then(response => {
      return response.json()
    }).then(response => {
      //  console.log('response',response)
        dispatch({ type: 'UPDATE_GAME_LIKES', games: response })
    })
  }
}