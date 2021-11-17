import React, { Component } from 'react';
import {dispatchComment,deleteComment} from '../../actions/comments'
import { connect } from 'react-redux';
import Reply from './Reply'
import Likes from '../games/Likes'



class Comment extends Component {
  state = {
    game_id: '',
    user_id: '',
    comment: '',
  }

  handleDeleteOnClick = (e) => {
    const params = {id: e.target.value}
     this.props.deleteComment(params)
  }

  handleOnclickReply = (e)=>{
    if(this.state.acordion !== 'replies_accordion active'){
    this.setState({
      acordion: 'replies_accordion active',
      displayAcordion: 'display_replies'
    })
  }else{
    this.setState({
      acordion: 'replies_accordion',
      displayAcordion: 'hide_replies'
    })
  }
  }

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
    e.preventDefault()
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight)+"px";
    this.setState({
      comment: e.target.value,
    })

  }

  reverseReplies = (replies)=>{
    
    if(replies[0] && replies[replies.length - 1].created_at > replies[0].created_at){  
           replies = replies.reverse((reply)=>{  
           return reply.created_at    
      })
    }
    return replies

  }


  fewComments=()=>{
   console.log(this.props.comments)
  }
  comments = () =>{    
    return ( 
      this.props.game && this.props.comments.map((comment)=>{
        return  (    
          <div   className='post' key={comment.id}> 
            <div >
            {comment.user.id === this.props.user.id? <button onClick={this.handleDeleteOnClick} className='delete' value={comment.id}>X</button>:null}
              <span >Posted by: {comment.user.name} {this.dateAndTime(comment.created_at)}</span>
            </div>
            <div className='comments'>
              <p>{comment.comment}</p>
            </div> 
            <div>
              <div>
                {this.props.loggedIn ?<Likes likes={comment.likes} comment_id={comment.id} user_id={this.props.user.id} gameCommentOrReply={comment}/>: null}
              </div>
              <div>
                <Reply replies={this.reverseReplies(comment.replies)} loggedIn={this.props.loggedIn} comment_id={comment.id} user_id={this.props.user.id} comment={comment}/>
              </div>
              
              
            </div>
          </div>
         
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
              <div className='comment_textArea'>
                <textarea onChange={this.onChangeComment} row='1' className='auto_height' value={this.state.comment}></textarea> 
                <input type='submit' className='buttons'value='Comment'/>
              </div>
            </form>
          </div>

        <div>

        </div>
        <ul className='comment_list'>
             {this.comments()}
        </ul>
        </div>
      );
    } else {
      return(
        <div>
             {this.comments()}
             <div>

            </div>
        </div>


      )
    }

    }
  
};


const mapDispatchToProps = dispatch => {
  return {
    dispatchComment: (action) => dispatch(dispatchComment(action)),
    deleteComment: (action) => dispatch(deleteComment(action))
  }
  }
  export default connect(null, mapDispatchToProps)(Comment)


