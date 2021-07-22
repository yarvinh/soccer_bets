import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/createUsersActions'
import UserInput from '../components/users/CreateUserInput'
class CreateUsersContainer extends Component {


  componentDidMount() {
       
  }

  CreatingUser = (user)=>{
    this.props.createUser(user)    
  }

  render() {
   
    return (
      <div>
        <UserInput CreatingUser={this.CreatingUser}/>
        {this.props.confirmLoggedIn()? this.props.redirect():null} 
      </div>
    );
  }
};



const mapStateToProps = state => { 
  return {
     users: state.users,
     loading: state.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUsersContainer)
