import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchLikes, dislike } from '../../actions/likesActions'
// import { fetchCurrentUser } from '../../actions/userAction';


class Likes extends Component {


    handleOnClickLikes = (e) => {
     console.log(this.props.game.likes)
      const likesParams = {user_id: this.props.user_id,game_id: this.props.game_id}
      this.props.dispatchLikes(likesParams)
    }

    handleOnclickDislike = (e)=>{
        this.props.dislike(this.likedIt())
    }

    likedIt = ()=>{
        return this.props.game.likes.find((like)=>{
            return like.user_id  === this.props.user_id.toString()
        })

    }

    renderLikes = ()=>{
        const style = {
            color: 'red',
            fontSize: 20
        };
       
        if (this.likedIt()){
            return (
                <div>
                    <i  onClick={this.handleOnclickDislike} style={style} className="fas fa-heart"></i> 
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



const mapDispatchToProps = dispatch => {
  return {
    dispatchLikes: (action) => dispatch(dispatchLikes(action)),
    dislike: (action) => dispatch(dislike(action))
  }
}
export default connect(null, mapDispatchToProps)(Likes)