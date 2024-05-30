const DateAndTime = (props)=>{
    const date = new Date(props.date.replace(/-/g, '\/'))
    const time = new Date(props.time)
    
    return (
      <div>
          <span>{date.toDateString()} at </span>      
          <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
      </div>
    )
}
    

export default DateAndTime