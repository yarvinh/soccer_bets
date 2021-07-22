const gameSelector = (games,filterBy) => {

    if(filterBy === 'all'){
        return games
    } 
    return games.filter( (game)=>{
        return game.competition === filterBy
    })
}

export default gameSelector 