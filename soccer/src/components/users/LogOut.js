import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoginLogOut } from '../../actions/loginActions'




class LogOut extends Component {
    
    handleLogOut = () => {
        this.props.fetchLoginLogOut(this.props.currentUser,'signout')
    }
  
    render() {
      return(
        <div>
          {this.handleLogOut()}
           {!this.props.confirmLoggedIn()? this.props.redirect():null}     
        </div>
      );
  
      
    }

};


const mapDispatchToProps = dispatch => {
  return {
    fetchLoginLogOut: (action,type) => dispatch(fetchLoginLogOut(action,type)),
  }
}

export default connect(null, mapDispatchToProps)(LogOut)