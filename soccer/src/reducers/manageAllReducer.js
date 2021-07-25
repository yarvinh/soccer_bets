import { combineReducers } from "redux";

const TeamsReducer = (state = { teams: [], loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_TEAMS':
        return state = {
           ...state,
          teams: [...state.teams],
          loading: true
        }
      case 'ADD_TEAMS':
        return {
           ...state,
          teams: action.teams,
          loading: false
        }
      default:
        return state;
    }
  }

  const GamesReducer = (state = { games: [],filter: 'all',loading: false }, action) => {
    
    switch(action.type) {
      case 'LOADING_GAMES':
       
        return state = {
           ...state,
          games: [...state.games],
          loading: true
        } 
      case 'LOADING_GAME_LIKES':
              return state = {
           ...state,
          games: [...state.games],
          loading: true
        } 
        //////
        case 'LOADING_GAME_BETS':
              return state = {
                ...state,
                games: [...state.games],
                loading: true
        } 
       //////
      case 'ADD_GAMES':
        return {
           ...state,
          games: action.games,
          loading: false
        } 
       
        case 'SET_FILTER':
                return {
                    ...state,
           filter: action.filterBy,
        } 
        case 'UPDATE_GAME_LIKES':
               return {
           ...state,
          games: action.games,
          loading: false
        } 
        case 'ADD_GAME_BETS':
          return {
          ...state,
          games: action.games,
          loading: false
   } 
    default:
      return state;
    }
    }



    const CreateUsersReducer = (state = { user: {}, loading: false }, action) => {
  
    switch(action.type) {
      case 'LOADING_USER':
        return state = {
             ...state,
          user: state.user,
          loading: true
        }
      case 'ADD_USER':
        return {
           ...state,
          user: action.user,
          loading: false
        }
      default:
        return state;
    }
  }

     const LoginReducer = (state = { user: {}, loading: false }, action) => {
 
    switch(action.type) {
      case 'LOADING_LOGIN':
        return state = {
          user: state.user
        }
      case 'LOGIN':
        return state = {
           
          user: action.user,
          loading: false
        }
      default:
        return state;
    }
  }

   



  const UserReducer = (state = { data: {}, loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_USER':
        return state = {
          data: state.data,
          loading: true
        } 

        case 'ADD_USER':
        return {
           ...state,
          data: action.data,
          loading: false
        } 

      default:
        return state;
    }
  }

const editUserReducer=(state = { message: {}, loading: false }, action)=>{

  switch(action.type) {
  case 'LOADING_SETTINGS':
    return state = {
      message: state.user,
      loading: true
    } 
  case 'EDITED_USER':
    return {
       ...state,
      message: action.user,
      loading: false
    } 
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  editedMessage: editUserReducer,
  teams: TeamsReducer,
  games: GamesReducer,
  login: LoginReducer, 
  createUsers: CreateUsersReducer,
  user: UserReducer,
 
});
 
export default rootReducer;
