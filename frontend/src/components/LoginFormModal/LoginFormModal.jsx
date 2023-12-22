import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {

  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({});
    const errObj = {}
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // console.log('DATA',data, 'DATA.ERRORS',data.errors)
        // console.log('check conditional',  data.message)
        if (data && data.message) {
          errObj.message = data.message

          setErrors(errObj);
        }
        // if (data && data.errors) {
        //   console.log('data.errors',data.errors)
        //   setErrors(data.errors);
        // }
      });
  };

  const demoUserLogin =  (e) => {
    e.preventDefault();

      return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password6'}))
     .then(closeModal)


  }





  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors.message && <div>{errors.message}</div>}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button
        disabled={credential.length < 4 || password.length < 6}
        type="submit">Log In</button>
      </form>
      <button type='button' onClick={demoUserLogin} className='demoLoginButton'>Demo User</button>

    </>
  );
}

export default LoginFormModal;
