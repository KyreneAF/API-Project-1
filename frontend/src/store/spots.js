import { csrfFetch } from "./csrf";
//ACTION TYPE

const LOAD_CURRENT_SPOTS = "spots/LOAD_CURRENT_SPOTS";
const LOAD_ALLSPOTS = "spots/LOAD_ALLSPOTS";
const LOAD_SPOTDETAILS = "spots/LOAD_SPOTDETAILS";
const CREATE_SPOT = "spots/CREATE_SPOT";
const ADD_SPOTIMAGE = "spots/ADD_SPOTIMAGE";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

//ACTION CREATOR
export const loadSpots = (spots) => {
  return {
    type: LOAD_ALLSPOTS,
    spots,
  };
};

//GET DETAILS OF SPOT SingleSpot
export const loadSpotDetails = (spots) => {
  return {
    type: LOAD_SPOTDETAILS,
    spots,
  };
};

// ADD AN IMAGE TO SPOT
const addSpotImage = (images, spotId) => {
  // console.log(images, "HI IM FROM ACTION ADD IMG");
  return {
    type: ADD_SPOTIMAGE,
    images,
    spotId,
  };
};

//  CREATE A SPOT
export const createSpot = (spot) => {
  // console.log("I AM SPOT ACTION", spot);
  return {
    type: CREATE_SPOT,
    spot,
  };
};

// GET ALL SPOTS CURRENT USER
export const loadCurrentSpots = (spots) => {
  // console.log("LOAD SPOTS", spots);
  return {
    type: LOAD_CURRENT_SPOTS,
    spots,
  };
};

export const updateSpot = (spot) => {
  return {
    type: UPDATE_SPOT,
    spot,
  };
};

export const deleteSpot = (id) => {
  return {
    type: DELETE_SPOT,
    id,
  };
};

//THUNK
export const thunkGetAllSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");

  if (res.ok) {
    const spots = await res.json();
    dispatch(loadSpots(spots));
  } else {
    return await res.json();
  }
};

//GET DETAILS OF SPOT SingleSpot

export const thunkGetDetailsSpot = (id) => async (dispatch) => {
  const res = await fetch(`/api/spots/${id}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpotDetails(data));
  } else {
    //Below is a possible refactor see createSpot.
    return await res.json();
  }
};

// THUNK TO ADD SPOT IMAGE
export const thunkAddSpotImage = (images, spotId) => async (dispatch) => {
  // let imgArr = [];
  console.log('SPOTID IN ADD SPOT THUNK', spotId)
  console.log("IM IMAGES IN IMAGE THUNK", images);

  for (let img of images) {
    //cant use array methods inside async

    if (img) {
      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(img),
      });

      if (res.ok) {
        const image = await res.json();
        console.log;
        dispatch(addSpotImage(image));
      }
    }
  }
};

//THUNK TO CREATE SPOT
export const thunkCreateSpot = (spot,Images) => async (dispatch) => {
  console.log("IM PARAM OF CREATE SPOT", spot);
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(spot), //this had spot.Spot
  });

  if (res.ok) {
    const newSpot = await res.json();
    await dispatch(createSpot(spot));
    console.log("SPOT AFT DIS FROM CREAT SPOT THUNK", newSpot)
    console.log('IM SENDING THIS TO SPOT IMG THUNK', Images)
    dispatch(thunkAddSpotImage(Images, newSpot.id));
    return spot;
  }
  return res;
};

// THUNK LOAD CURRENT SPOT
export const thunkLoadCurrSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  const data = await res.json();
  if (res.ok) {
    dispatch(loadCurrentSpots(data));
    // console.log('res is good')
  }
  return res;
};

//  THUNK UPDATE A SPOT
export const thunkUpdateSpot = (spotId, spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot.Spot),
  });

  if (res.ok) {
    const data = await res.json();
    // console.log("hi i am data in thunk", data);
    // dispatch(updateSpot(data));
    dispatch(updateSpot(data));
  }
};

// THUNK DELETE SPOT
export const thunkDeleteSpot = (id) => async (dispatch) => {
  console.log('INSIDE THUNK ID', id)
  const res = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();

    dispatch(deleteSpot(data));
  }
  return res;
};








const initialState = {};

export const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALLSPOTS: {
      let newState = {}
      console.log('ACTION SPOTS',action.spots)
      action.spots.Spots.forEach(spot =>{
        newState[spot.id] = spot
      })
      return {...state,...newState}

    }


    case LOAD_SPOTDETAILS: {
      //make a copy of state
      let newState = { ...state };
      //make new ref of obj you are changing

      newState[action.spots.id] = {
        ...state[action.spots.id],
        ...action.spots,
      };
      //mutate the copies
      return newState;
    }

    case CREATE_SPOT:{
      let newState = {...state,[action.spot.id]:{...action.spot}}
      console.log('STATE IN REDUCER', newState)
      return newState

    }

    // case CREATE_SPOT: {
    //   let newState = { ...state };
    //   let newSpot = { ...action.spot, SpotImages: [], Owner: {} };
    //   newState[action.spot.id] = { ...state[action.spot.id], ...newSpot };
    //   return newState;
    // }

    case ADD_SPOTIMAGE: {


    }
      //make a copy of state
    //   let newState = { ...state };
    //   //make new ref of obj you are changing
    //   let spot = newState[action.spotId];
    //   if (action.image.preview === true) {
    //     spot.previewImage = action.image.url;
    //   }
    //   //mutate the copies
    //   newState[action.spotId] = { ...state[action.spotId], ...spot };
    //   return newState;
    // }

    case LOAD_CURRENT_SPOTS: {
      let newState = { ...state };

      // action.spots.Spots.forEach(spot =>{
      action.spots.Spots.forEach((spot) => {
        let newSpot = { ...spot, SpotImages: [], Owner: {} };
        newState[spot.id] = { ...state[spot.id], ...newSpot };
      });
      return newState;
    }

    case UPDATE_SPOT: {
      let newState = { ...state };
      let newSpot = { ...action.spot };

      newState[newSpot.id] = { ...state[action.spot.id], ...newSpot };
      return newState;
    }

    case DELETE_SPOT: {
      let newState = { ...state };
      delete newState[action.id];

      return newState;
    }


    default:
      return state;
  }
};

// const initialState = {};

// export const spotReducer = (state = initialState, action) => {
//        let newState = { ...state };

//   switch (action.type) {
//     case LOAD_ALLSPOTS:
//       return { ...state, ...action.spots };

//     case LOAD_SPOTDETAILS:
//       return { ...state, ...action.spots };

//     // case CREATE_SPOT:
//     //   return { ...state, [action.spot.id]: action.spot };

//     // case UPDATE_SPOT:
//     //   return { ...state, [action.spot.id]: action.spot };

//     // case ADD_SPOTIMAGE:
//     //   return { ...state, ...action.image };

//     default:
//       return state;
//   }
// };
