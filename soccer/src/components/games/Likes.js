import { connect } from 'react-redux';
import { dispatchLikes, dislike } from '../../actions/likesActions'
import { LIKED_STYLE, NO_LIKE_STYLE } from '../../consts/likesConst';

const Likes = (props)=>{
    const handleOnClick = (e) => {
        const likesParams = {user_id: props.user_id, game_id: props.game_id,comment_id: props.comment_id, reply_id: props.reply_id}
        likedIt ? props.dislike(likedIt) : props.dispatchLikes(likesParams)
    }

    const likedIt = props.likes.find(like => like.user_id  === props.user_id)

    // const renderCommentLikes = ()=>{
    //     const style = {
    //         color: 'red',
    //         fontSize: 20
    //     };
       
    //     if (likedIt()){
    //         return (
    //             <div>
    //                 <img src='/instagram-likes.svg' style={LIKED_STYLE} />
    //             </div>
    //         )
    //     }else{
    //         return (
    //             <div>
    //                 < img src='/instagram-likes.svg' onClick={handleOnClickLikes} style={NO_LIKE_STYLE }/>
    //             </div>
    //         )   
    //     } 
    // }


    return(
        <div>     
            <div>
                <img onClick={handleOnClick} src='/instagram-likes.svg'  style={likedIt? NO_LIKE_STYLE : LIKED_STYLE } /> 
            </div>
            <span>Likes {props.likes.length}</span>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
  return {
    dispatchLikes: (action) => dispatch(dispatchLikes(action)),
    dislike: (action) => dispatch(dislike(action)),
    
  }
}
export default connect(null, mapDispatchToProps)(Likes)