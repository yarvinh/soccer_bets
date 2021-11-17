import React, { Component } from 'react';
import { connect } from 'react-redux';
import {dispatchReply,deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'


class Reply extends Component {

  state = {
    reply: '',
    acordion: 'replies_accordion',
    displayAcordion: 'hide_replies'
  }

  handleDeleteOnClick = (e)=>{
    const params = {user_id: this.props.user_id, id: e.target.value}
  
    this.props.deleteReply(params)

  }

  handleOnKeyUp = (e)=>{
   
    if (e.code  === 'Enter'){
      const params = {user_id: this.props.user_id, comment_id: this.props.comment_id, reply: this.state.reply }
      this.props.dispatchReply(params)
      this.setState({
        reply: ''
      })
    }
  }

  handleOnChange = (e)=>{
    console.log(e.which)
    e.target.style.height = "2px";
    e.target.style.height = (e.target.scrollHeight)+"px";
    this.setState({
      reply: e.target.value,
    })

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

  renderReplies = () =>{ 
    return ( 
      this.props.comment && this.props.comment.replies.map((reply)=>{
        return  (    
          <div   className='replies' key={reply.id}> 
            <div>
            {reply.user.id === this.props.user_id? <button onClick={this.handleDeleteOnClick} className='delete' value={reply.id}>x</button>:null}
              <span >Reply by: {reply.user.name} {this.dateAndTime(reply.created_at)}</span>
             
            </div>
            
              <div className='reply'>
                <p >{reply.reply}</p>
              </div> 
              <div>
            
              <div>
                {this.props.loggedIn? <Likes likes={reply.likes} reply_id={reply.id} user_id={this.props.user_id} gameCommentOrReply={reply}/>:null}
              </div>

              
            </div>
          </div>
         
        )      
  })
    )
  }
  replyForm= ()=>{
    if(this.props.loggedIn){
      return(
        <div>
          <form onKeyUp={this.handleOnKeyUp} >
            <textarea  onChange={this.handleOnChange} rows="1" className="auto_height" value={this.state.reply}></textarea>
          </form>  
        </div>
      )
    }
  }

  render() {
 
    return (
      <div>
        <div>
          <button onClick={this.handleOnclickReply} className={this.state.acordion}> {`${this.props.comment.replies.length} Replies`} </button>
          </div>
          <div className={this.state.displayAcordion}>
            <div>
              {this.renderReplies()}
            </div>
            {this.replyForm()}
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchReply: (action) => dispatch(dispatchReply(action)),
    deleteReply: (action) => dispatch(deleteReply(action))
  }
  }
  export default connect(null, mapDispatchToProps)(Reply)