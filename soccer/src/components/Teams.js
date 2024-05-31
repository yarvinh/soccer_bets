import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTeams } from '../actions/teamActions'
import '../styles/styles.css'


class Teams extends Component {

    state = {
        teams: [],
        league: [],
    }

    componentDidMount() {
       this.props.fetchTeams()
    }

   onClickHandle = (e) => {
 
      let  teams = this.props.teams.filter( (team)=>{
           return team.league === e.target.value
      })
      this.setState({
          league: teams,
      })
      
   }

   renderTeams = ()=>{
       return this.state.league.map((team)=>{
           return (    
            <div className="card team-card my-2" key={team.id}>
                <div className="card-header"><img src={team.logo_url} alt='' width="20" height="20"/> </div>
                <div className="card-body"> 
                  <p > {team.fc} </p>  
                </div>
             </div>  
     
           )
       })
   }

  render() {
 

    return (
      <div>   
          <select onChange={this.onClickHandle} className="form-select form-select mx-auto"> 
            <option  value='all'>Select Competition</option>
            <option value='Premier League'>Premier league</option>
            <option value='La Liga'>La Liga Santander</option>
            <option value='Serie A'>Serie A</option>
            <option value='Ligue 1'>Ligue 1</option>
            <option value='Bundesliga'>Bundesliga</option>
          </select> 
        <ul className="d-flex flex-column align-items-center justify-content-center">
         {this.renderTeams()}
        </ul>
      </div>
    );
  }
};



const mapStateToProps = state => {
  return {
     teams: state.teams.teams,
     league: state.league,
     loading: state.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     fetchTeams: () => dispatch(fetchTeams())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Teams)
