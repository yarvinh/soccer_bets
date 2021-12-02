import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLoginLogOut } from '../../actions/loginActions'
import '../../styles/styles.css'
import {Redirect} from 'react-router-dom'


class Login extends Component {
    state = {
       username: '',
       password: '',
       loggedIn: false,
    }

    redirect = ()=>{
      return <Redirect to='/games' /> 
    }
    errorMessages = () => {
      
      if (this.props.user.user && this.props.user.user.messages){
        if(!this.props.user.user.messages[0].includes("No user")){
          return  <p>{this.props.user.user.messages[0]}</p> 
        } else{
          return null
        }
      }
        

    }
   
    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    handleOnSubmit = (e) => {
       e.preventDefault()
       this.props.fetchLoginLogOut(this.state, 'LOADING_LOGIN')

      
    }

  render() {
    return(
      <div>
      <div className="container h-100  d-flex  justify-content-center align-items-center">
        <form onSubmit={this.handleOnSubmit} className="form">
            <label className="mt-3 form-label">Username</label>
            <input className="form-control" onChange={this.handleOnChangeUsername} type="text" value={this.state.username}/>
            <label className="form-label">Password</label >
            <input className="form-control" onChange={this.handleOnChangePassword } type="password" value={this.state.password}/>
          <button  className="my-4 btn btn-primary" type="submit">Login</button>
        </form>
         {this.props.user.user && this.props.user.user.logged_in? this.redirect():null}     
      
      </div>
      <div>{this.errorMessages()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)