
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







// reducer.js
// const initialState = {
//     Spots: {
//       allSpots: [], // Initial state for all spots
//       spotDetails: null, // Initial state for spot details
//     },
//   };

//   export const spotReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case LOAD_ALLSPOTS:
//         return {
//           ...state,
//           Spots: {
//             ...state.Spots,
//             allSpots: action.spots,
//           },
//         };
//       case LOAD_SPOTDETAILS:
//         return {
//           ...state,
//           Spots: {
//             ...state.Spots,
//             spotDetails: action.spot,
//           },
//         };
//       default:
//         return state;
//     }
//   };

//   export default spotsReducer;




let initialState = {}

//REDUCER

export const spotReducer = (state = initialState, action) => {
    let newState = { ...state };

    switch (action.type) {
      case LOAD_ALLSPOTS:
        newState = { ...action.spots };
        return newState;

      case LOAD_SPOTDETAILS:
        newState = {...state,...state.Spots,spotDetails:action.spot };
        return newState;

      default:
        return state;
    }
  };


// export const spotReducer = (state = initialState, action) => {

//     const newState = {...state};
//    switch(action.type){
//        case LOAD_ALLSPOTS:{
//            const spots ={}
//            const arr = []
//            action.spots.Spots.forEach(spot => arr.push(spots[spot.id] = spot))
//            return(newState.spots = arr);
//            }
//        default:
//            return state;

//    }
// }
