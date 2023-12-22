import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";

// import * as sessionActions from '../../store/session'; removed after adding modal
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);




  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        < NavLink className='nav-link' to="/spots/new" >
          Create a New Spot
        </ NavLink >
        <div className='user-prof-bttn'>
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
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
