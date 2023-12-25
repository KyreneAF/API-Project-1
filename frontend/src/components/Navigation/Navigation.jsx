import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

// import * as sessionActions from '../../store/session'; removed after adding modal
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  // const navAfterLogin = () =>{
  //   navigate('/')

  // }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div className='manage-spots-pb-cont'>
        < NavLink className='nav-link' to="/spots/new" >
          Create a New Spot
        </ NavLink >
        <div className='user-prof-bttn'>
          <ProfileButton user={sessionUser} />
        </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>

        <div className='login-main-cont'>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </div>
        <div>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </div>
      </>
    );
  }





  return (
    <div
      className="nav-box"
      style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}
    >
      <div className="nav-container">
        <div className="logo">

          <i className="fa-brands fa-airbnb icon-img"></i>
          <NavLink className="nav-link home-title" to="/">
            airbnb
          </NavLink>
        </div>
        <div className="signin-container">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
