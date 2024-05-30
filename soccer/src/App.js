
import { connect } from 'react-redux';
import {useEffect } from 'react';
import './App.css';
import Teams from './components/Teams'
import GamesContainer from './containers/GamesContainer'
import CreateUsersContainer from './containers/CreateUsersContainer'
import Login from './components/users/Login'
import { fetchCurrentUser} from './actions/userAction'
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom'
import User from './components/users/User'
import LogOut from './components/users/LogOut'
import './styles/styles.css'
import Settings from './components/users/Settings';
import GameDetail from './components/GameDetail';
import { fetchGames } from './actions/gameActions';

const  App = (props)=> {
  const fetchCurrentUser = () => {
    props.fetchCurrentUser()  
  }
  useEffect(()=>{
    fetchCurrentUser()  
    props.fetchGames() 
  },[])

  const confirmLoggedIn=()=>{
    fetchCurrentUser()   
    return  props.loggedIn

  }




  return ( 
    <>   
        <BrowserRouter >
        <div className="App">
        <nav  className="navbar navbar-dark bg-primary">
          <div className="container"> 
          <p className="navbar-brand">Soccer Bets</p>
              <Link to='/games' className="nav-link custom-nav-link">Games</Link>
              <Link to='/teams' className="nav-link custom-nav-link">Teams</Link>
              {!props.loggedIn ? <Link to='/login' className="nav-link custom-nav-link">Log In</Link>:  <Link to='/signout' className="nav-link custom-nav-link">Sign Out</Link>  }
              {!props.loggedIn && <Link to='/signup' className="nav-link custom-nav-link">Sign Up</Link> } 
              {props.loggedIn && <Link to='/settings' className="nav-link custom-nav-link">Settings</Link> } 
          </div>    
        </nav>
        {props.loggedIn && <User user={props.user}/>} 
         
          <Routes>
            <Route exact path='/settings' element ={<Settings currentUser={props.user} loggedIn={props.loggedIn} />}/>
            <Route exact path='/games/:id' element ={<GameDetail currentUser={props.user} loggedIn={props.loggedIn}/>}/>
            <Route exact path='/signout' element={<LogOut currentUser={props.user} confirmLoggedIn={confirmLoggedIn}/>}/>
            <Route exact path='/login' element={<Login  confirmLoggedIn={confirmLoggedIn}/>}>
            </Route>
            <Route exact path='/signup'element={<CreateUsersContainer />}/>
            <Route exact path='/games' element={<GamesContainer/>}/>
            <Route exact path='/teams' element={<Teams/>}/>
          </Routes>
         </div> 
        </BrowserRouter>
    </>

  )
}



const mapStateToProps = state => { 
  return {
     user:  state.user.user && state.user.user.user,
     loggedIn:  state.user.user && state.user.user.logged_in,
     loading: state.loading
  }
}
 
 

const mapDispatchToProps = dispatch => {
  return {
    fetchGames: ()=> dispatch(fetchGames()),
    fetchCurrentUser: (action) => dispatch(fetchCurrentUser(action)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
