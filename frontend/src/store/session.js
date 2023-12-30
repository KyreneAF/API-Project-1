
import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};



// THUNKS

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });

  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
//



export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

//



export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password
    })
  });

  if(response.ok){
    const data = await response.json();
    dispatch(setUser(data.user));

  }
  else{
    const errors = await response.json();
    dispatch(setUser(errors.errors))

  }
  return response;
};

// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;

//   try {
//     // Make a POST request to create a new user
//     const response = await csrfFetch("/api/users", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         firstName,
//         lastName,
//         email,
//         password,
//       }),
//     });

//     if (response.ok) {
//       // If the response is successful, parse JSON data
//       const data = await response.json();

//       // Dispatch the setUser action with the user data from the response
//       dispatch(setUser(data.user));
//     }

//     // Return the entire response, which can be useful for error handling
//     return response;
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error("Error during signup:", error);
//     throw error; // You can choose to rethrow the error or handle it differently
//   }
// };


export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};








//REDUCER

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;

// import { csrfFetch } from './csrf';

// const SET_USER = 'session/SET_USER';
// const REMOVE_USER = 'session/REMOVE_USER';

// export const actionSetUser = (user) => {
//   return {
//     type: SET_USER,
//     payload: user
//   }
// }

// export const actionRemoveUser = () => {
//   return {
//     type: REMOVE_USER
//   }
// }

// export const login = (user) => async (dispatch) => {
//   const { credential, password } = user;
//   const response = await csrfFetch("/api/session", {
//     method: "POST",
//     body: JSON.stringify({
//       credential,
//       password
//     })
//   });
//   const data = await response.json();
//   dispatch(actionSetUser(data.user));
//   return response;
// };

// export const restoreUser = () => async (dispatch) => {
//   const response = await csrfFetch("/api/session");
//   const data = await response.json();
//   dispatch(actionSetUser(data.user));
//   return response;
// };

// export const signup = (user) => async (dispatch) => {
//   const { username, firstName, lastName, email, password } = user;
//   const response = await csrfFetch("/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       username,
//       firstName,
//       lastName,
//       email,
//       password
//     })
//   });
//   const data = await response.json();
//   dispatch(actionSetUser(data.user));
//   return response;
// };

// export const logout = () => async (dispatch) => {
//   const response = await csrfFetch('/api/session', {
//     method: 'DELETE'
//   });
//   dispatch(actionRemoveUser());
//   return response;
// };

// const initialState = { user: null }

// const sessionReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER: {
//       return { ...state, user: action.payload };
//     }
//     case REMOVE_USER: {
//       return { ...state, user: null };
//     }
//     default:
//       return state;
//   }
// }

// export default sessionReducer;
