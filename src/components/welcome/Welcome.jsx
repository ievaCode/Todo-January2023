import './welcome.scss'

const Welcome = (props) => { 
    return(
        <div className="welcome">
            <p>Hi {props.username}! You've got <span>{props.tasksLeft}</span> tasks to complete</p>
        </div>
    )    
}

export default Welcome;