import { useState } from "react";
import { useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    setCredential("");
    setPassword("");
    setErrors({});
    setIsButtonDisabled(true);
  }, []);

  useEffect(() => {
    const newErrors = {};
    if (credential.length > 0 && credential.length < 4) {
      newErrors.credential = 'Username or Email must be at least 4 characters';
    }
    if (password.length > 0 && password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    setIsButtonDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(data);
        }
      })
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
        <h1>Log In</h1>
        {errors.message && (
          <p className='error-message'>{errors.message}</p>
        )}
        <div className='login-items'>
          <label id='userName-field'>
            Username or Email
            <input
              type="text"
              className='login-box'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && (
            <p className='error-message'>{errors.credential}</p>
          )}
          <label id='password-field'>
            Password
            <input
              type="password"
              className='login-box'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && (
            <p className='error-message'>{errors.password}</p>
          )}
        </div>
        <button type="submit" id='login-button' disabled={isButtonDisabled}>Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;