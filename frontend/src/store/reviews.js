import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_SPOTS_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = 'reviews/delete_review';
const CLEAR_STATE = 'reviews/clear_state'



export const loadSpotsRev = (reviews, id) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews,
    id

  };
};



export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const deleteReview = (id) =>{

  return{
    type: DELETE_REVIEW,
    id
  }
}
export const clearState = () => {
  return {
    type:CLEAR_STATE
  }
}



// THUNK
export const thunkGetReviews = (id) => async (dispatch) => {


    const res = await csrfFetch(`/api/spots/${id}/reviews`);

    if (res.ok) {
      const reviews = await res.json();
      // console.log('REVIEWS IN THUNK', reviews)

      dispatch(loadSpotsRev(reviews,id));
    } else if (res.status === 404) {
      console.log('Reviews not found for this spot.');
    }
    else{
      const errors = await res.json()
      console.log('ERRORS',errors)
      return errors
    }


};


export const thunkDeleteReview = (id) => async(dispatch) =>{

  const res = await csrfFetch(`/api/reviews/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })


  if(res.ok){
    const deletedRev = await res.json();

    dispatch(deleteReview(id))
    return deletedRev
  }else{
    const errors = await res.json();

    return errors
  }
}




// THUNK CREATE A REVIEW
export const thunkCreateReview = (id, user, review) => async (dispatch) => {
  // console.log(review,'from thunk!!!!')
  const res = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const review = await res.json();
    console.log('review in thunk', review)
    review.User = {
      id: user.id,
      firsName: user.firstName,
      lastName: user.lastName,
    };

    // console.log('review with user', review)
    dispatch(createReview(review));
    dispatch(thunkGetReviews(id));
  }
  return res;
};





//REDUCER
const initialState = {};

export const reviewsReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_SPOT_REVIEWS:{
      let newObj = {};
       action.reviews.Reviews.forEach((review) => {
          newObj[review.id] = review;

      });

      return {...newObj};
    }


    case DELETE_REVIEW: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }
    case CLEAR_STATE:{
      return {}
    }
    case CREATE_REVIEW:{
      // console.log ('NEW STATE', newState)
      // return {[action.review.id]:{...action.review},...state}
      // trying to add to top of reviews list still not working below still does not add to top
      return  { ...state, [action.review.id]: { ...action.review, ...state[action.review.id] } }
      // return newState;

    }



    default:
      return state;
  }
};
