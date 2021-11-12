
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import Teams from './components/Teams'
import GamesContainer from './containers/GamesContainer'
import CreateUsersContainer from './containers/CreateUsersContainer'
import Login from './components/users/Login'
import { fetchCurrentUser} from './actions/userAction'
import {BrowserRouter, Switch, Route, Redirect,Link} from 'react-router-dom'
import User from './components/users/User'
import LogOut from './components/users/LogOut'
import './styles/styles.css'
import Settings from './components/users/Settings';


class App extends Component{
  fetchCurrentUser = () => {
    this.props.fetchCurrentUser()  
  }
  componentDidMount(){
    this.fetchCurrentUser()  
  }

  redirect =()=>{
    this.fetchCurrentUser()   
    return <Redirect to='/games' />
  
  }
  confirmLoggedIn=()=>{
    this.fetchCurrentUser()   
    return  this.props.loggedIn

  }





  

render () {
 
  return ( 
    <>   
        <BrowserRouter >
          
        <div className="App">
        
        <nav  className="navbar navbar-dark bg-primary">
          <div className="container"> 
          {/* <a className="navbar-brand" href="#">Soccer Bets</a>  */}
          <p className="navbar-brand">Soccer Bets</p>
              <Link to='/games' className="nav-link custom-nav-link">Games</Link>
              <Link to='/teams' className="nav-link custom-nav-link">Teams</Link>
              {!this.props.loggedIn ? <Link to='/login' className="nav-link custom-nav-link">Log In</Link>:  <Link to='/signout' className="nav-link custom-nav-link">Sign Out</Link>  }
              {!this.props.loggedIn ? <Link to='/signup' className="nav-link custom-nav-link">Sign Up</Link> : null} 
              {this.props.loggedIn ? <Link to='/settings' className="nav-link custom-nav-link">Settings</Link> : null} 
          </div>    
        </nav>
        {this.props.loggedIn ? <User user={this.props.user}/>: null} 
         
          <Switch>
            <Route exact path='/settings' render={(props)=>(<Settings  {...props} currentUser={this.props.user} loggedIn={this.props.loggedIn} />)}/>
            <Route exact path='/games/:id' render={(props)=>(<GamesContainer {...props} fetchCurrentUser={this.fetchCurrentUser} currentUser={this.props.user} loggedIn={this.props.loggedIn}/>)}/>
            <Route exact path='/signout' render={(props)=>(<LogOut {...props} currentUser={this.props.user} redirect={this.redirect} confirmLoggedIn={this.confirmLoggedIn}/>)}/>
            <Route exact path='/login' render={(props)=>(<Login {...props} redirect={this.redirect} confirmLoggedIn={this.confirmLoggedIn}/>)}>
            {this.props.loggedIn ? <Redirect to='/games'/>:  null} 
            </Route>
            <Route exact path='/signup' render={(props)=>(<CreateUsersContainer  {...props} redirect={this.redirect} confirmLoggedIn={this.confirmLoggedIn}/>)}/>
            <Route exact path='/games' render={(props)=>(<GamesContainer {...props} fetchCurrentUser={this.fetchCurrentUser} currentUser={this.props.user} loggedIn={this.props.loggedIn}/>)}/>
            <Route exact path='/teams' component={Teams}/>
          </Switch>
         </div> 
        </BrowserRouter>
    </>
  
    
  );
}
}



const mapStateToProps = state => { 
  return {
     user:  state.user.data && state.user.data.user,
     loggedIn:  state.user.data && state.user.data.logged_in,
     loading: state.loading
  }
}
 
 

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: (action) => dispatch(fetchCurrentUser(action)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
