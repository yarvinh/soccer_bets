import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGames,dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import {gameSelector} from '../selectors/gameSelector'
import Comment from '../components/comments/Comment'



const GamesContainer = (props)=>{
  console.log(props)
  useEffect(()=> {
      props.fetchGames()    
  },[])

   const onClickHandle = (e) => {
     props.dispatchSetFilter(e.target.value)
   }

   const renderGames = ()=>{
        return props.games?.map((game)=>{
            return (      
             <Game teamEvents={game.team_events} fetchCurrentUser={props.fetchCurrentUser} loggedIn={props.loggedIn} key={game.id} currentUser={props.currentUser}  game={game} teamOne={game.teams[0]} teamTwo={game.teams[1]}/>
            )
        })
   }

  //  const renderGameWithId = () => {
  //   const game = props.games?.find((game)=>{
  //      return game.id.toString() ===  props.match?.params.id.toString()
  //    })
  //    console.log(game)
  //    if(game){  
  //      return (
  //        <div>
  //          <Game  fetchCurrentUser={props.fetchCurrentUser} loggedIn={props.loggedIn} key={game.id} currentUser={props.currentUser}  game={game} teamOne={game.team_events[0].team} teamTwo={game.team_events[1].team}/>
  //          <Comment comments={game.comments_by_date} game={game} currentUser={props.currentUser}  loggedIn={props.loggedIn} />
  //        </div>
  //      )
  //    } 
  // }


     return (
       <section className='games-container'>
        <select onChange={onClickHandle} className="form-select my-3 mx-auto"> 
           <option value='all'>All</option>
           <option value='Champion League'>UEFA Champion league</option>
           <option value='Premier League'>Premier league</option>
           <option value='La Liga'>La Liga Santander</option>
           <option value='Serie A'>Serie A</option>
           <option value='Ligue 1'>Ligue 1</option>
           <option value='Bundesliga'>Bundesliga</option>
        </select>
        <div>
          {renderGames()} 
        </div>
      </section>
     );
  };


const mapStateToProps = state => { 
  
  return {
     user: state.user.user,
     teams: state.teams.teams,
     games: gameSelector(state.games.games,state.games.filter),
     loading: state.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     fetchGames: (action) => dispatch(fetchGames(action)),
      dispatchSetFilter: (action) => dispatch(dispatchSetFilter(action)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer)
