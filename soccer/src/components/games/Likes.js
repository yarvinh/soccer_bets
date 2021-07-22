import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchLikes } from '../../actions/likesActions'
// import { fetchCurrentUser } from '../../actions/userAction';


class Likes extends Component {


    handleOnClickLikes = (e) => {
     console.log(this.props.game.likes)
      const likesParams = {user_id: this.props.user_id,game_id: this.props.game_id}
      this.props.dispatchLikes(likesParams)
    }
    componentDidMount() {
    
    }

    renderLikes = ()=>{
        const style = {
            color: 'red',
            fontSize: 20
          };
        const likedIt = this.props.game.likes.find((like)=>{
            return like.user_id  === this.props.user_id.toString()
        })
       
        if (likedIt){
            return (
                <div>
                    <i  style={style} className="fas fa-heart"></i> 
                </div>
            )
        }else{
            return (
                <div>
                    <i onClick={this.handleOnClickLikes} className="far fa-heart"></i> 
                </div>
            )   
        }
       
    }

    
 
  render() {
      return(
     <div>
         {this.renderLikes()}
         <span>Likes {this.props.game.likes.length}</span>
     </div>
      )

   };
}



// const mapStateToProps = state => {
//     // console.log('likes',state)
//   return {
//     //  rerenderLikes: state.likes.likes,
//     //  userlikedIt: state.likes.userlikedIt  
//   }
// }
 

const mapDispatchToProps = dispatch => {
  return {
    dispatchLikes: (action) => dispatch(dispatchLikes(action))
  }
}
export default connect(null, mapDispatchToProps)(Likes)