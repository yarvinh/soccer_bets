import {useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchLoginLogOut } from '../../actions/loginActions'
import {Navigate} from 'react-router-dom'




const LogOut = (props)=>{
    const handleLogOut = () => {
        props.user.user && props.fetchLoginLogOut(props.user.user.user,'LOADING_LOGOUT')
    }

    useEffect(() => {
      handleLogOut()
    },[])


      return(
        <div>
           {props.user.user && !props.user.logged_in && <Navigate to='/games'/>}     
        </div>
      );    

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