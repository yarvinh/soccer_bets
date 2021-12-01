import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchLikes, dislike } from '../../actions/likesActions'



class Likes extends Component {


    handleOnClickLikes = (e) => {
      const likesParams = {user_id: this.props.user_id,game_id: this.props.game_id,comment_id: this.props.comment_id, reply_id: this.props.reply_id}
      this.props.dispatchLikes(likesParams)
    }

    handleOnclickDislike = (e)=>{
        this.props.dislike(this.likedIt())
    }

    likedIt = ()=>{
        return this.props.gameCommentOrReply && this.props.gameCommentOrReply.likes.find((like)=>{
            if (this.props.user_id){
              return like.user_id  === this.props.user_id.toString()
            }
        })
    }

    renderGameLikes = ()=>{
        const style = {
            color: 'red',
            fontSize: 20,
            cursor: 'pointer'
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
                    <i onClick={this.handleOnClickLikes} style={{cursor: 'pointer'}}className="far fa-heart"></i> 
                </div>
            )   
        }
       
    }

    renderCommentLikes = ()=>{
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
         {this.renderGameLikes()}
         <span>Likes {this.props.likes.length}</span>
     </div>
      )

   };
}



const mapDispatchToProps = dispatch => {
  return {
    dispatchLikes: (action) => dispatch(dispatchLikes(action)),
    dislike: (action) => dispatch(dislike(action)),
    
  }
}
export default connect(null, mapDispatchToProps)(Likes)