import React, { Component } from 'react';
import Bets from './Bets'
import {Link} from 'react-router-dom'
import Likes from './Likes'
import '../../styles/styles.css'


class Game extends Component {
  

 

  bets = () => {
    if (this.props.loggedIn ){
      return (
        <div className="bets-section bg-light mx-auto my-4 py-2">
          <Bets teams={this.props.game.teams} team_events={this.props.game.team_events} bets={this.props.game.bets} fetchCurrentUser={this.props.fetchCurrentUser} currentUser={this.props.currentUser} game={this.props.game} teamOne={this.props.teamOne} teamTwo={this.props.teamTwo} />
       </div>
      )
    }
  }


 renderLikes = ()=>{
    if (this.props.loggedIn){
      return (
        <div className="likes-section bg-light mx-auto my-2 py-2">
           <div>
            <Likes likeType={'game'} likes={this.props.game.likes} gameCommentOrReply={this.props.game} user_id={this.props.currentUser.id} game_id={this.props.game.id}/>
          </div>
        </div>
      )
    }
 }



date = ()=>{
 const date = new Date(this.props.game.date.replace(/-/g, '\/'))
  const time = new Date(this.props.game.time)
  
  return (
    <div>
        <span>{date.toDateString()} at </span>      
        <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
    </div>
  )
}


  render() {

    return (
      <div className="container d-flex justify-content-center">
        <div className="card-container mb-3">

          <div className="card game-card text-center mx-auto my-3" >     
            <div onClick={this.handleOnClick} className="game">
                <div className="card-header">
                  <p> {this.props.game.competition} </p>
                </div>
                <div className="status">
                  {this.props.game.status === "LIVE" ? <p className='live'> {this.props.game.status} </p>: <p> {this.props.game.status}</p>}
                </div>
                <Link to={`/games/${this.props.game.id}`}>  
                  <div className="card-body">
                      <span >  
                          <img src={this.props.teamOne.logo_url} alt='' width="20" height="20"/> {this.props.teamOne.fc} 
                      </span>  
                        <p>VS</p>
                      <span>
                          <img src={this.props.teamTwo.logo_url} alt='' width="20" height="20"/> {this.props.teamTwo.fc}  
                      </span>
                  </div>
                </Link>
                <div className="card-footer">
                  {this.date()}
              </div>
            </div>
          </div>
          
          {this.renderLikes()}
   
          <div >
            <span>{this.props.game.bets.length} Bets</span>
 
          </div>
          {this.bets()}


        </div>

    </div>
  
    );
  }
};

export default Game ;