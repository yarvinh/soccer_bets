import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoginLogOut } from '../../actions/loginActions'
import {Redirect} from 'react-router-dom'




class LogOut extends Component {
    
    handleLogOut = () => {
        this.props.user.user && this.props.fetchLoginLogOut(this.props.user.user.user,'LOADING_LOGOUT')
    }
    redirect =()=>{ 
      return <Redirect to='/games' />  
    }
  
    render() {
      return(
        <div>
          {this.handleLogOut()}
           {this.props.user.user && !this.props.user.logged_in? this.redirect():null}     
        </div>
      );
  
      
    }

};

const mapStateToProps = state => { 
  return {
      user: state.user,
      loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLoginLogOut: (action,type) => dispatch(fetchLoginLogOut(action,type)),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(LogOut)