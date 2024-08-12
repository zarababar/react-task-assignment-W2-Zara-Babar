import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { setLoginAuth } from "../../utils/authutils";
import { login } from "../authservice";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    isPasswordVisible: false,
    isLoading: false
  });
  const navigate = useNavigate();

  const validate = useCallback(() => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    setFormState(prev => ({ ...prev, isLoading: true }));
    try {
      const { token } = await login(enteredUsername, enteredPassword);

      //Set authentication token and username to local storage
      setLoginAuth(token, enteredUsername);

      navigate('/listings');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      setErrors(prev => ({ ...prev, form: `Login Failed: ${errorMessage}` }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setFormState(prev => ({ ...prev, isPasswordVisible: !prev.isPasswordVisible }));
  }, []);

  const { isPasswordVisible, isLoading } = formState;

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
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && <div className="control-error"><p>{errors.username}</p></div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              ref={passwordRef}
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              className={errors.password ? 'input-error' : ''}
            />
            <span className="toggle-password pointer" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? "👁️" : "🙈"}
            </span>
          </div>
          {errors.password && <div className="control-error"><p>{errors.password}</p></div>}
        </div>
      </div>

      {errors.form && <div className="form-error">{errors.form}</div>}

      <p className="form-actions">
        <button type="reset" className="button button-flat" disabled={isLoading}>Reset</button>
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </p>
    </form>
  );
}
