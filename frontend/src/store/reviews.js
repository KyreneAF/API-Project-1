import { csrfFetch } from "./csrf";

const GET_SPOTS_REVIEWS = "reviews/GET_SPOTS_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";

export const loadSpotsRev = (reviews) => {
  // console.log('this is reviews action', reviews)
  return {
    type: GET_SPOTS_REVIEWS,
    reviews,
  };
};

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};








// THUNK
export const thunkGetReviews = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${id}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadSpotsRev(reviews.Reviews));
  }
  return res;
};








// THUNK CREATE A REVIEW
export const thunkCreateReview = (id,user,review) => async (dispatch) => {
    // console.log(review,'from thunk!!!!')
  const res = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const data = await res.json();
    data.User ={
        id:user.id,
        firsName: user.firstName,
        lastName:user.lastName
    }

    dispatch(createReview(data));
  }
  return res;
};









//REDUCER
const initialState = {};

export const reviewsReducer = (state = initialState, action) => {
//   let newState = {};
    let newState = {...state}
  let reviews = []

  switch (action.type) {
    case GET_SPOTS_REVIEWS:
       reviews = [...action.reviews];

        newState.reviews = action.reviews;

      return newState;
    case CREATE_REVIEW:
        newState = {[action.review.id]: action.review};

        return newState;

    default:
      return state;
  }
};
