import React, { Component } from 'react';

// import ReviewsContainer from '../../containers/ReviewsContainer';

class Reply extends Component {

  state = {
    game_id: '',
    user_id: '',
    comment_id: '',
    acordion: 'replies_accordion',
    displayAcordion: 'hide_replies'
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

  render() {

    return (
      <div>
        <button onClick={this.handleOnclickReply} className={this.state.acordion}> Replies </button>
          <div>
              <input className={this.state.displayAcordion} type='text'/>
        </div>
      </div>
    );
  }
};

export default Reply;