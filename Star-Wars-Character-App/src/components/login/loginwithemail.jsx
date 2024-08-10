import { useState, useRef } from "react";
import './Login.css';
import axios from 'axios';

export default function Login() {
  const emailRef = useRef();
//   const usernameRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ username: '', password: '' });

  const validate = () => {
    const email = emailRef.current.value;
    // const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }
    // if (!username) {
    //   errors.username = 'Username is required';
    // }

    if (!password) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); //prevents browser default reloading and losing everything 
    if (!validate()) {
      return;
    }

    const enteredEmail = emailRef.current.value;
    // const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    // console.log(enteredUsername)
    console.log(enteredPassword)
    try {

      const responsedata = await axios.get('https://dummyjson.com/users')
      const users = responsedata.data.users;
      const user = users.find(u => u.email === enteredEmail);

      if (user) {
        const username = user.username;
        console.log('Username:', username);
        
        const loginResponse = await axios.post('https://dummyjson.com/auth/login', {
          username: username, // Use the found username here
          password: enteredPassword,
          expiresInMins: 30,
        });
      
        localStorage.setItem("token", JSON.stringify(loginResponse.data.token));
        const token = localStorage.getItem("token");
        console.log('Login Successful', loginResponse.data);
        
      } else {
        console.log('User not found');
      }


    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Login Failed: ${error.response.data.message}`);
      } else {
        alert('Login Failed: An unexpected error occurred.');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="email" name="email" />
          <div className="control-error">{errors.email && <p>{errors.email}</p>} </div>
          {/* <label htmlFor="string">Username</label>
          <input ref={usernameRef} id="username" type="text" name="username" />
          <div className="control-error">{errors.username && <p>{errors.username}</p>} </div> */}

        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} id="password" type="password" name="password" />
          <div className="control-error">{errors.password && <p>{errors.password}</p>} </div>

        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" >Login</button>
      </p>
    </form>
  );
}
