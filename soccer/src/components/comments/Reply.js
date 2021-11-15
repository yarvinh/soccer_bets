import React, { Component } from 'react';
import { connect } from 'react-redux';
import {dispatchReply,deleteReply} from '../../actions/replyActions'

// import ReviewsContainer from '../../containers/ReviewsContainer';

class Reply extends Component {

  state = {
    reply: '',
    acordion: 'replies_accordion',
    displayAcordion: 'hide_replies'
  }

  // auto_height = (elem) =>{  
  //   elem.style.height = "1px";
  //   elem.style.height = (elem.scrollHeight)+"px";
  // }

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
              <span >Reply by: {reply.user.name} {this.dateAndTime(reply.created_at)}</span>
            </div>
            
              <div className='reply'>
                <p >{reply.reply}</p>
              </div> 
              <div>
            
              <div>
                {/* <Likes likes={comment.likes} comment_id={comment.id} user_id={this.props.user.id} gameOrComment={comment}/> */}
              </div>

              
            </div>
          </div>
         
        )      
  })
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnclickReply} className={this.state.acordion}> Replies </button>
          <div className={this.state.displayAcordion}>
            <div>
              {this.renderReplies()}
            </div>
            <div>
              <form onKeyUp={this.handleOnKeyUp} >
                {/* <input onChange={this.handleOnChange} rows='1' value={this.state.value}  type='text' className="auto_height"/>    */}
                <textarea  onChange={this.handleOnChange} rows="1" className="auto_height" value={this.state.reply}></textarea>

              </form>  
             
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