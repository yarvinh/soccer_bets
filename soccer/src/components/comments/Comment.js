import React, { Component } from 'react';
import {dispatchComment} from '../../actions/comments'
import { connect } from 'react-redux';


class Comment extends Component {
  state = {
    game_id: '',
    user_id: '',
    comment: ''
  }

//   renderLikes = ()=>{
//     const style = {
//         color: 'red',
//         fontSize: 15
//     };
   
//     // if (this.likedIt()){
//         return (
//             <div>
//                 <i  onClick={this.handleOnclickDislike} style={style} className="fas fa-heart"></i> 
//             </div>
//         )
//     // }else{
//     //     return (
//     //         <div>
//     //             <i onClick={this.handleOnClickLikes} className="far fa-heart"></i> 
//     //         </div>
//     //     )   
//     // }
   
// }

  // handleOnclickReply = (e)=>{
  //   console.log(e)
  // }

  dateAndTime = (d)=>{
    const date = new Date(d)
    const time = new Date(d)
    return (
      <div>
          <span>{date.toDateString()} at </span>      
          <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
      </div>
    )
  }


  handleOnSubmit = (e)=>{
    e.preventDefault()
    const params = {comment: this.state.comment,user_id: this.props.user.id, game_id: this.props.game.id}
    this.props.dispatchComment(params)
      this.setState({
        comment: ""
      })
     
  }

  onChangeComment = (e) => {
    this.setState({
      comment: e.target.value,
    })

  }

  comments = () =>{ 
    return ( 
      this.props.game && this.props.game.comments.map((comment)=>{
        return  (      
          <li key={comment.id}>
             <span>Posted by: {comment.user.name} {this.dateAndTime(comment.created_at)}</span>
             <p>{comment.comment}</p>
             
             {/* <span > {this.renderLikes()} (2)</span> */}
             <button onClick={this.handleOnclickReply}> Replies </button>
            
          </li>
         
        )
      
  })
    )
  }

  render() {
    if (this.props.loggedIn){
      return (
        <div>
          <div>
            <form onSubmit={this.handleOnSubmit} value={this.state.comment}>
              <label>What you think about this game?</label> 
              <br></br>
              <textarea onChange={this.onChangeComment} value={this.state.comment}></textarea> 
              <input type='submit' value='Comment'/>
            </form>
        </div>

        <div>

        </div>
        <ul>
             {this.comments()}
        </ul>
        </div>
      );
    } else {
      return(
        <div>
          <ul>
   
             {this.comments()}
          </ul>

        </div>
      )
    }

    }
  
};


const mapDispatchToProps = dispatch => {
  return {
    dispatchComment: (action) => dispatch(dispatchComment(action))
  }
  }
  export default connect(null, mapDispatchToProps)(Comment)