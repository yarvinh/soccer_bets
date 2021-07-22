import React, { Component } from 'react';
import {dispatchBets} from '../../actions/betsActions'
import { connect } from 'react-redux';
class Bets extends Component {

  state = {
    team_id: '',
    game_id: '',
    user_id: '',
    amount: ''
  }


  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.team_id !== ''&& this.state.game_id !== '' && this.state.user_id !== '' && this.state.amount !== ''){
      this.props.dispatchBets(this.state)
      
    }

     
  }
  handleAmountChange = (e) => {
    this.setState({
      amount: e.target.value,
    })
  
  }
  
  handleTeamChange = (e) => {
     this.setState({
       team_id: e.target.value.toString(),
       game_id: this.props.game.id.toString(),
       user_id: this.props.currentUser.id.toString()
     })
  }

  teamOneBetSum = () => {
    const bets = [...this.props.game.bets]
    let counter = 0
    bets.forEach((bet) => {
      if (this.props.teamOne.id.toString() === bet.team_id.toString()){
        counter  += bet.amount 
      }else{
        counter += 0
      } 
    })
    return counter
  }

  teamTwoBetSum = () => {  
    const bets = [...this.props.game.bets]
    let  counter = 0
    bets.forEach((bet) => {
     
      if (this.props.teamTwo.id.toString() === bet.team_id.toString()){
        counter += bet.amount    
      }else{
        counter += 0  
      }
    });
       return counter

  }

  allBetsTotal = () => {
    const bets = [...this.props.game.bets]
      return bets.reduce(function(acc, bet) {
        return acc + bet.amount
      }, 0);
  }

  betExplanation = () => {
    let teamOneBetcalcs = (this.allBetsTotal()/1)/this.teamTwoBetSum()
    let teamTwoBetcalcs = (this.allBetsTotal()/1)/this.teamOneBetSum()

    if(this.teamOneBetSum() > 99 && this.teamTwoBetSum() > 99){
      return(
        <div>
          <p><img src={this.props.teamOne.logo_url} alt='' width="15" height="15"/> you get ${Math.floor(teamOneBetcalcs)} for each dolar you bet</p>
          <p><img src={this.props.teamTwo.logo_url} alt='' width="15" height="15"/>you get ${Math.floor(teamTwoBetcalcs)} for each dolar you bet</p>
        </div>
        )
    } else {
      return <p>Not enough bets yet</p>
    }
  }


  renderBets = () => {
    const userBet = this.props.game.bets.find((bet)=>{
        return bet.user_id.toString() === this.props.currentUser.id.toString()
    })
   
    if (!userBet){   
      return (
        <div className='bet_form p-3'>     
          <form onSubmit={this.handleSubmit}> 
            <label className="form-label"> Bets </label> 
            <br/> 
            <select className="form-select mx-auto mb-3" onChange={this.handleTeamChange}>
              <option value=''>Select team</option>
              <option value={this.props.teamOne.id}>{this.props.teamOne.fc}</option>
              <option value={this.props.teamTwo.id}>{this.props.teamTwo.fc}</option>
            </select>
            <input className="form-control" type="hidden" name="action" value={this.props.game.id} />
            <label className="form-label"> Enter amount </label>
            <input className="form-control" onChange={this.handleAmountChange} type='number'  value={this.state.amount}/>
            <button type="submit" className="btn btn-primary btn-default my-3">Submit bet</button>
          </form>
          <div className='bet_explanation'>
             {this.betExplanation()}
          </div>
        </div>
      )
    } else {
      const teamUserBet = this.props.game.teams.find((team)=>{
        return team.id.toString() === userBet.team_id.toString()
      })
        return (
          <div className='bet_review'>
            <p>You bet: ${userBet.amount}</p>
            <span>
              Team:
              <img src={teamUserBet.logo_url} alt='' width="15" height="15"/>
            </span>
            
          </div>
          )   
      }

  }


  render() {
    return (
      <div>
           {this.renderBets()}
      </div>
    );
  }
};

// const mapStateToProps = state => {
// return {
//   //  rerenderLikes: state.likes.likes,
//   //  userlikedIt: state.likes.userlikedIt  
// }
// }


const mapDispatchToProps = dispatch => {
return {
  dispatchBets: (action) => dispatch(dispatchBets(action))
}
}
export default connect(null, mapDispatchToProps)(Bets)