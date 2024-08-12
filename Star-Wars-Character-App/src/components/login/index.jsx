// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import './Login.css';
// import axios from 'axios';

// export default function Login() {
//   const usernameRef = useRef();
//   const passwordRef = useRef();
//   const [errors, setErrors] = useState({});
//   const [formState, setFormState] = useState({
//     isPasswordVisible: false,
//     isLoading: false
//   });
//   const navigate = useNavigate();

//   const authUrl = import.meta.env.VITE_APP_LOGIN_API_URL;

//   const validate = () => {
//     const username = usernameRef.current.value;
//     const password = passwordRef.current.value;
//     const newErrors = {};

//     if (!username) {
//       newErrors.username = 'Username is required';
//     }

//     if (!password) {
//       newErrors.password = 'Password is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validate()) {
//       return;
//     }

//     const enteredUsername = usernameRef.current.value;
//     const enteredPassword = passwordRef.current.value;

//     setFormState(prevState => ({ ...prevState, isLoading: true }));
//     try {
//       const { data } = await axios.post(authUrl, {
//         username: enteredUsername,
//         password: enteredPassword,
//         expiresInMins: import.meta.env.VITE_EXPIRES_IN
//       });

//       localStorage.setItem("authToken", JSON.stringify(data.token));
//       const token = localStorage.getItem('authToken');
//       const isAuthenticated = !!token; // If token exists, user is authenticated


//       navigate(`/listings/${data.token}`, { state: { username: enteredUsername } });

//       console.log('Login Successful', data);
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       console.error('Login Failed:', error);
//       setErrors(prevErrors => ({
//         ...prevErrors,
//         form: `Login Failed: ${errorMessage}`,
//       }));
//     } finally {
//       setFormState(prevState => ({ ...prevState, isLoading: false }));
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setFormState(prevState => ({ ...prevState, isPasswordVisible: !prevState.isPasswordVisible }));
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <div className="control-row">
//         <div className="control no-margin">
//           <label htmlFor="username">Username</label>
//           <input
//             ref={usernameRef}
//             id="username"
//             type="text"
//             name="username"
//             className={errors.username ? 'input-error' : ''}
//           />
//           <div className="control-error">{errors.username && <p>{errors.username}</p>}</div>
//         </div>

//         <div className="control no-margin">
//           <label htmlFor="password">Password</label>
//           <div className="password-input">
//             <input
//               ref={passwordRef}
//               id="password"
//               type={formState.isPasswordVisible ? "text" : "password"}
//               name="password"
//               className={errors.password ? 'input-error' : ''}
//             />
//             <span className="toggle-password pointer" onClick={togglePasswordVisibility}>
//               {formState.isPasswordVisible ? "👁️" : "🙈"}
//             </span>
//           </div>
//           <div className="control-error">{errors.password && <p>{errors.password}</p>}</div>
//         </div>
//       </div>

//       {errors.form && <div className="form-error">{errors.form}</div>}

//       <p className="form-actions">
//         <button type="reset" className="button button-flat" disabled={formState.isLoading}>Reset</button>
//         <button type="submit" className="button" disabled={formState.isLoading}>
//           {formState.isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </p>
//     </form>
//   );
// }
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from 'axios';

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    isPasswordVisible: false,
    isLoading: false
  });
  const navigate = useNavigate();

  const authUrl = import.meta.env.VITE_APP_LOGIN_API_URL;

  const validate = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const newErrors = {};

    if (!username) {
      newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setFormState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const { data } = await axios.post(authUrl, {
        username: enteredUsername,
        password: enteredPassword,
      });

      localStorage.setItem("authToken", data.token); // Store the token as a string
      localStorage.setItem("username", enteredUsername); // Store the token as a string
      
      navigate(`/listings`, { state: { username: enteredUsername } }); // Navigate to Listings

      console.log('Login Successful', data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      console.error('Login Failed:', error);
      setErrors(prevErrors => ({
        ...prevErrors,
        form: `Login Failed: ${errorMessage}`,
      }));
    } finally {
      setFormState(prevState => ({ ...prevState, isLoading: false }));
    }
  };

  const togglePasswordVisibility = () => {
    setFormState(prevState => ({ ...prevState, isPasswordVisible: !prevState.isPasswordVisible }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="username">Username</label>
          <input
            ref={usernameRef}
            id="username"
            type="text"
            name="username"
            className={errors.username ? 'input-error' : ''}
          />
          <div className="control-error">{errors.username && <p>{errors.username}</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              ref={passwordRef}
              id="password"
              type={formState.isPasswordVisible ? "text" : "password"}
              name="password"
              className={errors.password ? 'input-error' : ''}
            />
            <span className="toggle-password pointer" onClick={togglePasswordVisibility}>
              {formState.isPasswordVisible ? "👁️" : "🙈"}
            </span>
          </div>
          <div className="control-error">{errors.password && <p>{errors.password}</p>}</div>
        </div>
      </div>

      {errors.form && <div className="form-error">{errors.form}</div>}

      <p className="form-actions">
        <button type="reset" className="button button-flat" disabled={formState.isLoading}>Reset</button>
        <button type="submit" className="button" disabled={formState.isLoading}>
          {formState.isLoading ? 'Logging in...' : 'Login'}
        </button>
      </p>
    </form>
  );
}
