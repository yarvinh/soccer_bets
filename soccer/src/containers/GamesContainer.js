import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGames,dispatchSetFilter} from '../actions/gameActions'
import Game from '../components/games/Game'
import gameSelector from '../selectors/gameSelector'
import Comment from '../components/comments/Comment'
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
           
             <Game fetchCurrentUser={this.props.fetchCurrentUser} loggedIn={this.props.loggedIn} key={game.id} currentUser={this.props.currentUser}  game={game} teamOne={game.teams[0]} teamTwo={game.teams[1]}/>

            )
        })
   }

   renderGameWithId = () => {
    
    const game = this.props.games && this.props.games.find((game)=>{
       return game.id.toString() ===  this.props.match.params.id.toString()
     })

     if(game){  
    //  let comments = game.comments
      // if(game.comments[0] && game.comments[game.comments.length - 1].created_at > game.comments[0].created_at){  
      //        comments = game.comments.reverse((a)=>{  
      //        return a.created_at    
      //   })
      // }
      // console.log(game.comments_by_date)
       return (
         <div>
           <Game  fetchCurrentUser={this.props.fetchCurrentUser} loggedIn={this.props.loggedIn} key={game.id} currentUser={this.props.currentUser}  game={game} teamOne={game.teams[0]} teamTwo={game.teams[1]}/>
           <Comment comments={game.comments_by_date} game={game} user={this.props.currentUser}  loggedIn={this.props.loggedIn} />
         </div>
       )
     } 
  }

  

  render() {  
    if(this.props.match.path === "/games"){
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
    } else {
       return (
         <div>
           {this.renderGameWithId()}
         </div>
       )
    }
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
