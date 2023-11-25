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
export const loadSpotDetails = (spot) => {
  return {
    type: LOAD_SPOTDETAILS,
    spot,
  };
};

// ADD AN IMAGE TO SPOT
const addSpotImage = (image, spotId) => {
  return {
    type: ADD_SPOTIMAGE,
    image,
    spotId,
  };
};

//  CREATE A SPOT
export const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot,
  };
};

// GET ALL SPOTS CURRENT USER
export const loadCurrentSpots = (spots) => {
  console.log("my action creator was hit");
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

export const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot,
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

  for (let image of images) {
    //cant use array methods inside async

    if (image) {
      const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify(image),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(addSpotImage(data, spotId));
      }
    }
  }
};

//THUNK TO CREATE SPOT
export const thunkCreateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot.Spot),
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(createSpot(data));
    dispatch(thunkAddSpotImage(spot.Images, data.id));
    return data;
  }
  return res;
};

export const thunkLoadCurrSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  // const res = await fetch('api/spots/current')
  // console.log('my thunk is hit')

  const data = await res.json();
  if (res.ok) {
    dispatch(loadCurrentSpots(data));
    // console.log('res is good')
  }
  return res;
};

//  THUNK UPDATE A SPOT
export const thunkUpdateSpot = (spotId, spot) => async (dispatch) => {
  const res = await csrfFetch(`api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(updateSpot(data, data.id));
  }
};

let initialState = {};

//REDUCER

export const spotReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD_ALLSPOTS:
      return { ...state, ...action.spots };

    case LOAD_CURRENT_SPOTS:
      newState = { ...action.spots };
      return newState;

    case LOAD_SPOTDETAILS:
      return { state, spot: action.spot };

    case CREATE_SPOT:
      return { ...state, spots: action.spot };
    // case CREATE_SPOT:
    //     return { ...state, spots: [...state.spots, action.spot] };

    // case ADD_SPOTIMAGE:

    //
    // NOT SURE HOW TO IMPLEMENT WILL UPDATE LATER

    default:
      return state;
  }
};
