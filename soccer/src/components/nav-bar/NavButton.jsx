const NavBarButton = ({handleonclick,isDiplay})=>{
    if(isDiplay)
        return (
            <div onClick={handleonclick} className="nav-button-active">
                <img src="../close.svg" id="nav-bar-x" alt="X close icon"/>
            </div>
        )
    else
        return(
            <div onClick={handleonclick} className="nav-button">
                <div className="nav-button-line"></div>
                <div className="nav-button-line"></div>
                <div className="nav-button-line"></div> 
            </div>
        )
}

export default NavBarButton