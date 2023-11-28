// import React from 'react';
// import { useState,useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';

// //example of how to change icons
// // {/* <div style={{ color: 'orange', fontSize: '24px' }}>
// // {/* Assuming you choose the user icon from Font Awesome */}
// // <i class="fa-solid fa-user"></i>
// // </div> */}

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
//     // if (!showMenu) setShowMenu(true);
//     setShowMenu(!showMenu);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={toggleMenu}>
//       <i class="fa-solid fa-user"></i>
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         <li>{user.username}</li>
//         <li>{user.firstName} {user.lastName}</li>
//         <li>{user.email}</li>
//         <li>
//           <button onClick={logout}>Log Out</button>
//         </li>
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;

// THIS IS DIFFERENT STYLING TOP IS ORIGINAL

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu} id="profile_button">
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="login-signup">
              <div id="user">
                <div className="credentials">Hello, {user.firstName}</div>
                <div className="credentials">{user.email}</div>
              </div>
              <div id="manage-spot">
                <NavLink to={"/spots/current"} className="manage-spots">
                  {" "}
                  Manage Spots
                </NavLink>
              </div>
              <div>
                <button id="logout-bttn" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="login-signup">
                <div className="login-hover">
                  <OpenModalButton
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </div>
                <div className="login-hover">
                  <OpenModalButton
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
