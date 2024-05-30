import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/createUsersActions'
import UserInput from '../components/users/CreateUserInput'
import {Navigate} from 'react-router-dom'
class CreateUsersContainer extends Component {

  creatingUser = (user)=>{
    this.props.createUser(user)   
    } 
  

  render() {
    return (
      <div>
         {this.props.user.user && this.props.user.user.logged_in? <Navigate to='/games'/>: <UserInput userResponse={this.props.user.user} creatingUser={this.creatingUser}/>}  
      </div>
    );
  }
};



const mapStateToProps = state => { 
  
  return {
     user: state.user,
     loading: state.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUsersContainer)
