import { csrfFetch } from "./csrf"
//ACTION TYPE

const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS'
const LOAD_SPOTDETAILS = 'spots/LOAD_SPOTDETAILS'
const CREATE_SPOT = 'spots/CREATE_SPOT'

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




//  CREATE A SPOT
export const createSpot = (spot) => {
    return{
        type:CREATE_SPOT,
        spot
    }

}











//THUNK
export const thunkGetAllSpots = () => async (dispatch) =>{

    const response = await fetch('/api/spots')

    if(response.ok){

        const spots = await response.json();
        dispatch(loadSpots(spots))
    }else{
        return await response.json()
    }

}


//GET DETAILS OF SPOT SingleSpot

export const thunkGetDetailsSpot = (id) => async (dispatch) =>{

    const response = await fetch(`/api/spots/${id}`);

    if(response.ok){
        const data = await response.json();
        dispatch(loadSpotDetails(data))
    }
    else{
        return await response.json()
    }
}


// CREATE A SPOT

export const thunkCreateSpot = (spot) => async(dispatch) =>{

    try{
        const response = await csrfFetch('/api/spots',{method:'POST', body:JSON.stringify(spot)});

        if(response.ok){
            const data = await response.json();
            dispatch(createSpot(data))
        }

    }
    catch(e){
        let errObj ={}

        return errObj.e = e.message

    }


}








let initialState = {}

//REDUCER

export const spotReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
      case LOAD_ALLSPOTS:
        newState = { ...action.spots };
        return newState;

      case LOAD_SPOTDETAILS:
        newState = {...state,spot:action.spot};
        return newState;

      default:
        return state;
    }
  };
