





//localhost:8000/api
//ACTION TYPE

const LOAD_ALLSPOTS = 'spots/LOAD_ALLSPOTS'

//ACTION CREATOR
export const loadSpots = (spots) =>{
    return {
        type: LOAD_ALLSPOTS,
        spots

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


let initalState = {}

//REDUCER

export const spotReducer = (state = initalState, action) => {

    let newState = {};
    switch(action.type){
        case LOAD_ALLSPOTS:{
            newState = {...action.spots}
            return newState
            }
        default:
            return state;

    }
}
