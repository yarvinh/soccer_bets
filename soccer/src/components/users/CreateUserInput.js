import React, { Component } from 'react';
// import ReviewsContainer from '../../containers/ReviewsContainer';

import '../../styles/styles.css'

class UserInput extends Component {
  handleOnSubmit = (e) => {
      e.preventDefault()
      const userInf = { 
        user: {name: e.target.children[1].value,
          email: e.target.children[4].value,
          username:  e.target.children[7].value,
          password:  e.target.children[10].value,
          confirmPassword:  e.target.children[13].value
        }
      } 

      this.props.CreatingUser(userInf)
  }



  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={this.handleOnSubmit} className="form">
          <label className="mt-5"> Name: </label>
          <input className="form-control" type='text'/> <br/>
          <label >Email:</label >
          <input  className="form-control" type='text'/> <br/>
          <label >Username:</label >
          <input className="form-control"  type='text'/> <br/>
          <label > Password: </label >
          <input className="form-control"  type='password'/> <br/>
          <label > Confirm password:</label >
          <input className="form-control"  type='password'/> <br/>
          <button type='submit' className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
};

export default UserInput  ;