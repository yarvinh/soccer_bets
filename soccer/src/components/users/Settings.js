import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEditUser} from '../../actions/settingsActions'
import '../../styles/styles.css'


class Settings extends Component {
    state = {
       new_password: '',
       old_password: '',
       new_email: '',
       email_confirmation: '',
       name: '',
       update_type: ''
    }

 
    handleOnChangeNewPassword = (e) => {
        this.setState({
            new_password: e.target.value,
            update_type: 'password'
        })
    }

    handleOnChangeOldPassword = (e) => {
    
        this.setState({
            old_password: e.target.value,
        })
    }

    handleOnChangeNewEmail = (e) => {

        this.setState({
            new_email: e.target.value,
            update_type: 'email'
        })
    }

    handleOnChangeEmailConfirmation= (e) => {
       
        this.setState({
            email_confirmation: e.target.value,
        })    
    }

    handleOnChangeName = (e) => {
        this.setState({
            name: e.target.value,
            update_type: 'name'
          
        })    
    }

     handleOnSubmit = (e) => {
       e.preventDefault()
       const userInfo = {user_info: this.state, user_id: this.props.currentUser.id.toString()}
       this.props.fetchEditUser(userInfo)  
       this.setState({
        new_password: '',
        old_password: '',
        new_email: '',
        email_confirmation: '',
        name: '',
        update_type: ''
       })   
    }
    emptyObject = () => {
        if (this.props.message && Object.keys(this.props.message).length === 0){
            return true
        }else if (this.props.message){
           return false
        }else{
           return true
        }
    }


  render() {
  

    return(
        <div>
  
            {!this.emptyObject() && this.props.message.error_messages? <p className="alert alert-danger" >{this.props.message.error_messages}</p> : null}
            {!this.emptyObject() && this.props.message.saved? <p className="alert alert-success" >{this.props.message.saved}</p> : null}
            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
                <h4 >Change your password</h4>
                <form onSubmit={this.handleOnSubmit} className="form">
                    <label className="mt-3 form-label">New password</label>
                    <input className="form-control" onChange={this.handleOnChangeNewPassword} type="password" value={this.state.new_password}/>
                    <label className="form-label">Old password</label >
                    <input className="form-control" onChange={this.handleOnChangeOldPassword } type="password" value={this.state.old_password}/>
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>

            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
               <h4>Change your email</h4> 
               
                <form onSubmit={this.handleOnSubmit} className="form">
                    <label className="mt-3 form-label">New email</label>
                    <input className="form-control" onChange={this.handleOnChangeNewEmail} type="email" value={this.state.email}/>
                    <label className="form-label">confirm email</label >
                    <input className="form-control" onChange={this.handleOnChangeEmailConfirmation } type="email" value={this.state.confirm_email}/>
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>


            <div className="container h-100  d-flex flex-column justify-content-center align-items-center">
            <h4>Change your name</h4>
                <form onSubmit={this.handleOnSubmit} className="form">
                    <label className="mt-3 form-label">Name</label>
                    <input className="form-control" onChange={this.handleOnChangeName} type="text" value={this.state.name}/>
                    <button  className="my-4 btn btn-primary" type="submit">save</button>
                </form>
            </div>


        </div>
    );

    
  }

};



const mapStateToProps = state => { 

  return {
     message:  state.editedMessage.message,
     loading: state.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
    fetchEditUser: (action) => dispatch(fetchEditUser(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)