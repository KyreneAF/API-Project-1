import { csrfFetch } from "./csrf";

const GET_SPOTS_REVIEWS = 'reviews/GET_SPOTS_REVIEWS';


export const loadSpotsRev = (reviews) =>{
    console.log('this is reviews action', reviews)
    return {
        type:GET_SPOTS_REVIEWS,
        reviews,


    }

}



// THUNK
export const thunkGetReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`);

    if (res.ok) {
      const reviews = await res.json();
      dispatch(loadSpotsRev(reviews.Reviews));
    }
    return res;
  };





const initialState = {}


export const reviewsReducer = (state = initialState, action) =>{
    const newState = {}

    switch(action.type){
        case GET_SPOTS_REVIEWS:
            const reviews = [...action.reviews];
            newState.reviews = reviews
            return newState

            default:
        return state;

    }

}
