import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

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
    <div className='login-main-container'>
      <div className='login-title-container'>Log In</div>
      <form onSubmit={handleSubmit}>
        {errors.message && <div className='error-text'>{errors.message}</div>}
        <div className='login-input-cont'>
        <label>
          Username or Email
          <input
            className='login-input-text-cont'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className='login-input-text-cont'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>


        <button
        className={ !errors.message ? "login-bttn" : "failed-login-bttn" }
        disabled={credential.length < 4 || password.length < 6}
        type="submit">Log In</button>
        </div>
      </form>
      {/* <div onClick={navAfterLogin}>Demo User</div> */}
      <button  type='button' onClick={demoUserLogin} className='demoLoginButton'>Demo User</button>
      {/* {createNavLink(demoUserLogin)} */}

    </div>
  );
}

export default LoginFormModal;
