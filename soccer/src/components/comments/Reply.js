import React, { Component } from 'react';
import { connect } from 'react-redux';
import {dispatchReply,deleteReply} from '../../actions/replyActions'
import Likes from '../games/Likes'


class Reply extends Component {

  state = {
    reply: '',
    acordion: 'replies_accordion',
    displayAcordion: 'hide_replies',
    displayReplies: 3,
  }

  handleDeleteOnClick = (e)=>{
    const params = {user_id: this.props.user_id, id: e.target.value}
  
    this.props.deleteReply(params)

  }

  handleOnKeyUp = (e)=>{
   
    if (e.code  === 'Enter'){
      const params = {user_id: this.props.currentUser.id, comment_id: this.props.comment_id, reply: this.state.reply }
      this.props.dispatchReply(params)
      this.setState({
        reply: ''
      })
    }
  }

  handleOnChange = (e)=>{
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

  displayOnSubmit = (e)=>{
    e.preventDefault()
    let amount = this.state.displayReplies + 10
    this.setState({
      displayReplies: amount,
    })
  }

  display10Replies=()=>{
    const  newRepliesArr = []
    for (let i = 0; i < this.state.displayReplies; i++){
      if(this.props.replies[i]){
      newRepliesArr.push(this.props.replies[i])
    }
    }
      return newRepliesArr 
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
      this.props.replies && this.display10Replies().map((reply)=>{
        return  (    
          <div   className='replies' key={reply.id}> 
            <div>
            {this.props.currentUser && reply.user.id === this.props.currentUser.id? <button onClick={this.handleDeleteOnClick} className='delete' value={reply.id}>x</button>:null}
              <span >Reply by: {reply.user.name} {this.dateAndTime(reply.created_at)}</span>
             
            </div>
            
              <div className='reply'>
                <p >{reply.reply}</p>
              </div> 
              <div>
            
              <div>
                {this.props.loggedIn? <Likes likes={reply.likes} reply_id={reply.id} user_id={this.props.currentUser.id} gameCommentOrReply={reply}/>:null}
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
          <button onClick={this.handleOnclickReply} className={this.state.acordion}> {`${this.props.replies.length} Replies`} </button>
          </div>
          <div className={this.state.displayAcordion}>
            <div>
              {this.renderReplies()}
            </div>
            <div>
              <form onSubmit={this.displayOnSubmit} >  
                <input  className='reload' type='submit' value='Reload more replies'/> 
              </form>
            </div>
            <br/>
            <div> 
              {this.replyForm()} 
            </div>    
               
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