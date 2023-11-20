
//localhost:8000/api
//ACTION TYPE

const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS'
const LOAD_SPOTDETAILS = 'spots/LOAD_SPOTDETAILS'

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









//THUNK
export const thunkGetAllSpots = () => async (dispatch) =>{
    console.log('********my thunk was hit')
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
