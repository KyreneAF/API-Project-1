import { useDispatch, useSelector } from "react-redux";
import {  useState,useEffect } from "react";
// import { useParams } from "react-router-dom";
import { thunkCreateReview } from "../../../store/reviews.js";
import { thunkGetReviews } from "../../../store/reviews.js";
import { thunkGetDetailsSpot } from "../../../store/spots.js";
import { useModal } from "../../../context/Modal.jsx";
import "./CreateReview.css";
// import './OpenModalButton/OpenModalButton.css'




export const CreateReview = ({spotId }) => {
  // const {id}  = useParams(); // <- this seems to not work bc there isn't a route. maybe findSpot instead?
   spotId =  Number(spotId)
  const dispatch = useDispatch();

  // const reviews = useSelector(state => state.reviews)

  const [review, setReview] = useState("");
  // const [validations, setValidations] = useState({});
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({})
  const maxStars = [1, 2, 3, 4, 5];

//   const [blackStars, setBlackStars] = useState(0)


    const currUser = useSelector((state) => state.session.user)
    const currSpot = useSelector((state) => state.spots)
    const reviews = useSelector((state) => state.reviews)

    console.log('REVIEWS IN CREATE REVIEWS',reviews)


    const user = {
        id:currUser.id,
        firstName:currUser.firstName,
        lastName:currUser.lastName
    }




  const onSubmit = async (e) => {
    e.preventDefault();
    // const errObj = {};
    const errObj = {};


    if (review.length < 10) {
      errObj.review = "Review must be at least 10 characters";


    }
    if (stars === 0) {
      errObj.stars = "Must have at least 1 star!";

    }
    if(currUser.id === currSpot.ownerId ) errObj.same = "same user"

    setErrors(errObj);

    const createdReview = {
      userId:user.id,
      spotId:spotId,
      review,
      stars,
    }
    // console.log('CREATED REVIEW', createdReview)

    if(Object.values(errors).length === 0){
      console.log('ERRORS', errors)
      await dispatch(thunkCreateReview(spotId, user, createdReview));

    }

    setReview("");
    setStars(0);
    closeModal();

    dispatch(thunkGetReviews(spotId))
    dispatch(thunkGetDetailsSpot(spotId))

        // return () => dispatch(thunkGetReviews(spotId))

  };






  return (
    <>

      <div className="create-review-container">
        <h1>How was your stay?</h1>
        { Object.keys(errors) && <div >{Object.values(errors).map((msg,index) => <div key={index}>{msg}</div>)}</div>}

        <form onSubmit={onSubmit}>
          <textarea
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <div className="star-container">
            {maxStars.map(
              (
                star,
                index //<- only way I can think to add a unique key
              ) => (
                <input
                  key={index}
                  type="radio"
                  name="stars"
                  value={star}
                  id={`star-${star}`}
                  checked={stars === star}
                  onChange={(e) => setStars(Number(e.target.value))}
                />
              )
            )}
            Stars
          </div>
          <div>
            <button
              type="submit"
              className="review-submit-btn"
              // disabled={validations.review || validations.stars || errors.same}
            >
              Submit Your Review
            </button>
          </div>
        </form>
      </div>

    </>
  );
};
