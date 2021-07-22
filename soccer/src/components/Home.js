import React from 'react';
import {Link} from 'react-router-dom'
const Home = (props) => {

    if(props.loggedIn){
       return (
           <div>
               <Link to='/signout'>Sign Out</Link> 
               {games()}
           </div>
       )
    } else {
       return (
           <div>
               {games()}
               <div>
                  <Link to='/login'>Log In</Link>
                  <Link to='/signup'>Sign Up</Link>  
               </div>
              
            </div>
        );
    }
};




const games = () => {
    return (
        <div> 
            <Link to='/games'>Games</Link>
            <Link to='/teams'>Teams</Link>
        </div>
    )
}
export default Home;