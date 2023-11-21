import { csrfFetch } from "./csrf"
//ACTION TYPE

const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS'
const LOAD_SPOTDETAILS = 'spots/LOAD_SPOTDETAILS'
const CREATE_SPOT = 'spots/CREATE_SPOT'
const ADD_SPOTIMAGE = 'spots/ADD_SPOTIMAGE'
const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS'


//ACTION CREATOR
export const loadSpots = (spots) =>{
    return {
        type: LOAD_ALLSPOTS,
        spots

    }


}

//GET DETAILS OF SPOT SingleSpot
export const loadSpotDetails = (spot) => {
    return {
        type: LOAD_SPOTDETAILS,
        spot

    }
}

// ADD AN IMAGE TO SPOT
const addSpotImage = (image, spotId) => {
    return {
        type: ADD_SPOTIMAGE,
        image,
        spotId
    }
}


//  CREATE A SPOT
export const createSpot = (spot) => {
    return{
        type:CREATE_SPOT,
        spot
    }

}



// GET ALL SPOTS CURRENT USER
export const loadCurrentSpots = (spots) =>{
    return{
        type:LOAD_CURRENT_SPOTS,
        spots

    }
}







//THUNK
export const thunkGetAllSpots = () => async (dispatch) =>{

    const res = await fetch('/api/spots')

    if(res.ok){

        const spots = await res.json();
        dispatch(loadSpots(spots))
    }else{
        return await res.json()
    }

}




//GET DETAILS OF SPOT SingleSpot

export const thunkGetDetailsSpot = (id) => async (dispatch) =>{

    const res = await fetch(`/api/spots/${id}`);

    if(res.ok){
        const data = await res.json();
        dispatch(loadSpotDetails(data))
    }
    else{
        //Below is a possible refactor see createSpot.
        return await res.json()
    }
}







// THUNK TO ADD SPOT IMAGE
export const thunkAddSpotImage = (images, spotId) => async (dispatch) => {
    for (let image of images) { //cant use array methods inside async

        if (image) {
            const res = await csrfFetch(`/api/spots/${spotId}/images`, {method: 'POST',body: JSON.stringify(image)})

            if (res.ok) {
                const data = await res.json();
                dispatch(addSpotImage(data, spotId))
            }
        }
    }
}








//THUNK TO CREATE SPOT
export const thunkCreateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', { method: 'POST',body: JSON.stringify(spot.Spot)});

    if (res.ok) {
        const data = await res.json();
        await dispatch(createSpot(data))
        dispatch(thunkAddSpotImage(spot.Images, data.id))
        return data;
    }
    return res.json()
}






// THUNK GET CURRENT SPOTS
export const thunkLoadCurrSpots = (spots) => async (dispatch) =>{
    const res = await csrfFetch('api/spots/current');

    if(res.ok){
        const data = await res.json();
        await dispatch(loadCurrentSpots(spots))
        return data;
    }
    return res;
}











let initialState = {}

//REDUCER


export const spotReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
      case LOAD_ALLSPOTS:
        newState = { ...state,...action.spots };
        return newState;

      case LOAD_SPOTDETAILS:
        newState = {...state,spot:action.spot};
        return newState;

        // case CREATE_SPOT:
        //     // need a key of id for map to work in SpotDetails
        //     newState = {...state,[action.spot.id]: action.spot};
        //     return newState;

        // case LOAD_CURRENT_SPOTS:
        //     newState = {...state,...action.spots};
        //     return newState;


      default:
        return state;
    }
  };
