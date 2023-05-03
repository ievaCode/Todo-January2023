import { useState } from "react";
import { nanoid } from 'nanoid';

const SignUp = (props) => {

const [matching, setMatching] = useState(true);
const [userCredentialsEntered, setCredentialsEntered] = useState({
  username:'',
  password1:'',
  password2:''
});

const handleInputChange = (e) => {
	setMatching(true);
    switch(e.target.name){
      case 'username':
        setCredentialsEntered({
          ...userCredentialsEntered,
          username: e.target.value
        });
        break;
      case 'password':
        setCredentialsEntered({
          ...userCredentialsEntered,
          password1: e.target.value
        });
        break;
      case 'password':
        setCredentialsEntered({
          ...userCredentialsEntered,
          password1: e.target.value
        });
        break;

      default:
        console.log('error');
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();
    let userData = props.users.find(user => user.username === userCredentialsEntered.username);
    console.log(userData);
    userData.password === userCredentialsEntered.password ?
      props.setLogedinUserId(userData.id) :
      setCorrectLogin(false);
      console.log(userData.id);
  }

  const handleSignupSubmit = e => {
    // e.preventDefault();
    // userCredentialsEntered.password1 === userCredentialsEntered.password1 ? 
    //   createNewUser() :
    //   setMatching(false)
  }

  return (
    <>
      <form className = "signupForm" onSubmit={handleSignupSubmit}>
        <label>
          Username:
          <input 
            className={!matching && "incorrect" }
            type="text"
            name="username"
            value={userCredentialsEntered.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input 
            className={!matching && "incorrect"}
            type="password"
            name="password1"
            value={userCredentialsEntered.password1}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input 
            className={!matching && "incorrect"}
            type="password"
            name="password2"
            value={userCredentialsEntered.password2}
            onChange={handleInputChange}
          />
        </label>
        {matching === false &&
          <p><small>*unmatching passwords</small></p> 
        }  
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
 
export default SignUp;