import './button.scss'

const Button = (props) => { 
    return(
      <div className={`button ${props.classname2}`} onClick={() => props.action(props.id)}>
        <p>{props.text}</p>
      </div>
    )    
}

export default Button;