
import { connect } from 'react-redux';
import {useEffect, useState } from 'react';
import './App.css';
import Teams from './components/Teams'
import GamesContainer from './containers/GamesContainer'
import CreateUsersContainer from './containers/CreateUsersContainer'
import Login from './components/users/Login'
import { fetchCurrentUser} from './actions/userAction'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import User from './components/users/User'
import LogOut from './components/users/LogOut'
import './styles/styles.css'
import Settings from './components/users/Settings';
import GameDetail from './components/GameDetail';
import { fetchGames } from './actions/gameActions';
import NavBar from './components/nav-bar/NavBar';
import NavBarButton from './components/nav-bar/NavButton';

const  App = (props)=> {
  const fetchCurrentUser = () => {
    props.fetchCurrentUser()  
  }
  
  const [isDiplay, setIsDisplay] = useState(false)

  const handleonclick = (e)=>{
      setIsDisplay((pre)=>!pre)
  }

  const handleOnAcordion = (e)=>{
    if (!e.target.className.includes("display"))
      setIsDisplay(false)
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
    <main>   
        <BrowserRouter >
        <section className={!isDiplay ?'profile-inf': "none"}>
         {!isDiplay && <img src='/IMG_0686-min.jpeg' className="profile-image" alt="profile image"/>}
          <NavBarButton handleonclick={handleonclick} isDiplay={isDiplay}/>
        </section>
        {isDiplay && <NavBar handleOnAcordion={handleOnAcordion} loggedIn={props.loggedIn}/>}
        <div className="App">
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
    </main>

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
