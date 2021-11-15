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
    e.target.style.height = "1px";
    e.target.style.height = (e.target.scrollHeight)+"px";
    this.setState({
      comment: e.target.value,
    })

  }

  comments = () =>{ 
    return ( 
      this.props.game && this.props.game.comments.map((comment)=>{
        return  (    
          <div   className='post' key={comment.id}> 
            <div >
              <span >Posted by: {comment.user.name} {this.dateAndTime(comment.created_at)}</span>
              {comment.user.id === this.props.user.id? <button onClick={this.handleDeleteOnClick} value={comment.id}>Delete</button>:null}
            </div>
            <div className='comments'>
              <p >{comment.comment}</p>
            </div> 
            <div>
              <div>
                <Likes likes={comment.likes} comment_id={comment.id} user_id={this.props.user.id} gameOrComment={comment}/>
              </div>
              <div>
                <Reply comment_id={comment.id} user_id={this.props.user.id} comment={comment}/>
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
              <textarea onChange={this.onChangeComment} row='1' className='auto_height' value={this.state.comment}></textarea> 
              <input type='submit' value='Comment'/>
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


