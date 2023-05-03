import { useState } from "react";

const Login = (props) => {

  const [correctLogin, setCorrectLogin] = useState(true);
  const [userCredentialsEntered, setCredentialsEntered] = useState({
    username:'',
    password:''
  });

  const handleInputChange = (e) => {
    setCredentialsEntered({...userCredentialsEntered, [e.target.name]: e.target.value});
  };

  const handleLoginSubmit = e => {
    e.preventDefault();
    let userData = props.users.find(user => user.username === userCredentialsEntered.username);
    userData && userData.password === userCredentialsEntered.password ?
      props.setLogedinUserId(userData.id) :
      setCorrectLogin(false);
  }

  return (
    <>
      <form className = "loginForm" onSubmit={handleLoginSubmit}>
        <label>
          Username        
          <input 
            className={!correctLogin ? "incorrect" : undefined }
            type="text"
            name="username"
            value={userCredentialsEntered.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password   
          <input 
            className={!correctLogin ? "incorrect" : undefined }
            type="password"
            name="password"
            value={userCredentialsEntered.password}
            onChange={handleInputChange}
          />
        </label>
        {correctLogin === false &&
          <p><small>*incorrect login data</small></p> 
        }               
        <input type="submit" value="Log in" />
      </form>
    </>
  );
}
 
export default Login;