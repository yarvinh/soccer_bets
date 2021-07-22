import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGames,dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import gameSelector from '../selectors/gameSelector'
// import Likes from '../components/Likes'


class GamesContainer extends Component {


    componentDidMount() {
       this.props.fetchGames()    
    }





   onClickHandle = (e) => {
     this.props.dispatchSetFilter(e.target.value)

   }

   renderGames = ()=>{
        return this.props.games && this.props.games.map((game)=>{
            return (      
           
             <Game loggedIn={this.props.loggedIn} key={game.id} currentUser={this.props.currentUser}  game={game} teamOne={game.teams[0]} teamTwo={game.teams[1]}/>

            )
        })
   }

  render() {
    return (
      <div>
       <select onChange={this.onClickHandle} className="form-select my-3 mx-auto"> 
          <option value='all'>All</option>
          <option value='Champion League'>UEFA Champion league</option>
          <option value='Premier League'>Premier league</option>
          <option value='La Liga'>La Liga Santander</option>
          <option value='Serie A'>Serie A</option>
          <option value='Ligue 1'>Ligue 1</option>
          <option value='Bundesliga'>Bundesliga</option>
       </select>
       <div>
         {this.renderGames()}
 
       </div>
        
      </div>
    );
  }
};



const mapStateToProps = state => { 
  return {
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
