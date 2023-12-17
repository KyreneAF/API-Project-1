import { csrfFetch } from "./csrf";

const GET_SPOT_REVIEWS = "reviews/GET_SPOTS_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = 'reviews/delete_review';




export const loadSpotsRev = (reviews) => {
  return {
    type: GET_SPOT_REVIEWS,
    reviews
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





// THUNK
export const thunkGetReviews = (id) => async (dispatch) => {
  try{

    const res = await csrfFetch(`/api/spots/${id}/reviews`);

    if (res.ok) {
      const reviews = await res.json();

      dispatch(loadSpotsRev(reviews));
    }else{
      const errors = await res.json()
      console.log('ERRORS',errors)
      return errors
    }
  }catch(e){
    console.errors(e)
  }

};


export const thunkDeleteReview = (id) => async(dispatch) =>{
  console.log('ID IN THUNK',id)
  const res = await csrfFetch(`/api/reviews/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })
  console.log('RES IN THUNK',res)

  if(res.ok){
    const deletedRev = await res.json();
    console.log('deletedRev',deletedRev)
    dispatch(deleteReview())
  }else{
    const errors = await res.json();
    console.log('ERRORS',errors)
    return errors
  }
}




// THUNK CREATE A REVIEW
export const thunkCreateReview = (id, user, review) => async (dispatch) => {
  // console.log(review,'from thunk!!!!')
  const res = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    data.User = {
      id: user.id,
      firsName: user.firstName,
      lastName: user.lastName,
    };

    dispatch(createReview(data));
  }
  return res;
};





//REDUCER
const initialState = {};

export const reviewsReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_SPOT_REVIEWS:{
      let newObj = {}
      action.reviews.Reviews.forEach(review => {
        newObj[review.id] = review
        newObj[review.id].User = {...review.User}
        newObj[review.id].ReviewImages = [...review.ReviewImages]
      })

      return {...state,...newObj}

    }

    case DELETE_REVIEW: {
      let newState = {...state}
      delete newState[action.id]
      return newState
    }

    // case CREATE_REVIEW:
    //   newState = { [action.review.id]: action.review };

    //   return newState;

    default:
      return state;
  }
};
