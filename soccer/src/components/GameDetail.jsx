import { Link, useParams } from "react-router-dom"
import { connect } from "react-redux"
import Bets from "./games/Bets"
import Likes from "./games/Likes"
import Date from "./DateAndTime"
import Comment from "./comments/Comment"

const GameDetail=(props)=>{
    const {id} = useParams()
    const game = props.games?.find(game => game.id.toString() ===  id) 
    const teamOne = game?.teams[0]
    const teamTwo = game?.teams[1]   

    return (
        <section>
            <div className="container d-flex justify-content-center game">
                <div className="card-container mb-3">
                    <div className="card game-card text-center mx-auto my-3" >     
                    <div  className="game">
                        <div className="card-header">
                            <h3> {game?.competition} </h3>
                        </div>
                        <div className="status">
                            {game?.status === "LIVE" ? <p className='live'> {game?.status} </p>: <p> {game?.status}</p>}
                        </div>
                        <Link to={`/games/${game?.id}`}>  
                            <div className="card-body">
                                <span >  
                                    <img src={teamOne?.logo_url} alt='team-logo' width="20" height="20"/> {teamOne?.fc} 
                                </span>  
                                <p>VS</p>
                                <span>
                                    <img src={teamTwo?.logo_url} alt='' width="20" height="20"/> {teamTwo?.fc}  
                                </span>
                            </div>
                        </Link>
                        <div className="card-footer">
                            {game && <Date date={game.date} time={game.time}/>}
                        </div>
                    </div>
                    </div>
                    <div className="likes-section bg-light mx-auto my-2 py-2">
                        <div>
                            { props.loggedIn && game && <Likes likeType={'game'} likes={game?.likes} gameCommentOrReply={game} user_id={props.currentUser.id} game_id={game?.id}/>}
                        </div>
                    </div>
                    <div >
                    <span>{game?.bets.length} Bets</span>
                    </div>

                    <div className="bets-section bg-light mx-auto my-4 py-2">
                    { props.loggedIn && game && <Bets teams={game?.teams} team_events={game?.team_events} bets={game?.bets} fetchCurrentUser={props.fetchCurrentUser} currentUser={props.currentUser} game={game} teamOne={teamOne} teamTwo={teamTwo} />}
                    </div>  
                </div>
            </div>
            <div>
                {game && <Comment comments={game.comments_by_date} game={game} currentUser={props.currentUser}  loggedIn={props.loggedIn} />}
            </div>
        </section>
        
    );
}


const mapStateToProps = state => { 
    return {
       user: state.user.user,
       games: state.games.games,
       loading: state.loading
    }
  }

  export default connect(mapStateToProps, null)(GameDetail)
   

