import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import * as sessionActions from '../../store/session'; removed after adding modal
import './Navigation.css';




function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
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
    <div className='nav-box'>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>

    </div>
  );
}

export default Navigation;



// THIS IS DIFFERENT STYLING TOP IS ORIGINAL

// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import './Navigation.css';

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector(state => state.session.user);

//   return (
//     <div className=''>
//       <li>
//         <NavLink exact to="/">Home</NavLink>
//       </li>
//       {isLoaded && (
//         <li>
//           <ProfileButton user={sessionUser} />
//         </li>
//       )}
//     </div>
//   );
// }

// export default Navigation;




// OPTION 3 THIS IS CONNECTED TO OpenModalMenuItem

// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';
// import OpenModalMenuItem from './OpenModalMenuItem';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import SignupFormModal from '../SignupFormModal/SignupFormModal';

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     closeMenu();
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={toggleMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>{user.firstName} {user.lastName}</li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />
//             <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul>
//     </>
//   );
// }

// export default ProfileButton;

// import { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import * as sessionActions from '../../store/session';


// export default function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const toggleMenu = (e) => {
//     e.stopPropagation();
//     setShowMenu(!showMenu)
//   }

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.thunkLogout());
//   };
//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)){
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener('click', closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const ulClassName = "profileDropdown" + (showMenu ? "" : " hidden");
//   return (
//     <>
//       <button onClick={toggleMenu} className='profileButton'>
//         <i className="fas fa-user fa-2x pic" />
//       </button>
//       <ul className={ulClassName} ref={ulRef}>
//         <li className='drowDown'>{user.username}</li>
//         <li className='drowDown'>{user.firstName} {user.lastName}</li>
//         <li className='drowDown'>{user.email}</li>
//         <li className='drowDown'>
//           <button onClick={logout} className='logoutButton'>Log Out</button>
//         </li>
//       </ul>
//     </>
//   );
// }
