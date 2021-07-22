

const User = (props) =>{

if (props.user){
    return (
       <div className="d-flex flex-column m-2 align-items-start justify-content-start">
        <p>  Welcome, {props.user.name}</p>
        <p>You Have ${props.user.coins}</p>
      </div>
    );
  }else{
    return null
  }
};

export default User  ;