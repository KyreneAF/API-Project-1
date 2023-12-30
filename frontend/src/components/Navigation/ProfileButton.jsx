import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import './Navigation.css'
// import './ProfileButton.css'



function ProfileButton({ user }) {

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fa-solid fa-bars user-icon"></i>
        <i className="fas fa-user-circle user-icon" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='drop-down-box-cont'  >
            <div className='pb-block' >
            <div>Hello, {user.firstName}</div>
            {/* <div>
              {user.firstName} {user.lastName}
            </div> */}
            <div>{user.email}</div>
            </div>
            <div className='pb-block'>
              <NavLink className='ms-Nav'to="/spots/current">Manage Spots</NavLink>
            </div>
            <div className='pb-block pb-block-bttn' >
              <button className='lo-bttn' onClick={logout}>Log Out</button>
            </div>
          </div>
        ) : (
          <>
          <div className='drop-down-box-cont'>
            <div className='pb-block'>
            <OpenModalMenuItem
            className='lI-text'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
