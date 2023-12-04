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
        <NavLink to="/spots/new" className="create-spot">
          Create a New Spot
        </NavLink>
        <div>
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
    <div className="nav-box" style={{ borderBottom: "2px solid gray" }}>
      <div className="nav-container">
        <div className="logo">
          <i className="fa-brands fa-airbnb"></i>
          <NavLink to="/">airbnb</NavLink>
        </div>
        <div className="signin-container">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
