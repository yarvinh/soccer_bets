import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/createUsersActions'
import UserInput from '../components/users/CreateUserInput'
class CreateUsersContainer extends Component {

  creatingUser = (user)=>{
    this.props.createUser(user)   
    } 
  

  render() {
    return (
      <div>
         {this.props.user.user && this.props.user.user.logged_in? this.props.redirect(): <UserInput userResponse={this.props.user.user} creatingUser={this.creatingUser}/>}  
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
