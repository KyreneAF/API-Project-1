import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false)
  const { closeModal } = useModal();




  const handleSubmit = (e) => {
    e.preventDefault();


    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-form-main-container' >
      <div className='su-title-cont'>Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className='su-input-main-cont' >
        <label className='su-label-cont' >
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => {setEmail(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className='su-label-cont'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label className='su-label-cont'>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className='su-label-cont' >
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className='su-label-cont' >
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className='su-label-cont' >
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>{ setConfirmPassword(e.target.value); setDisable(true)}}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button disabled={!disable || username.length < 4 || password.length < 6} type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
