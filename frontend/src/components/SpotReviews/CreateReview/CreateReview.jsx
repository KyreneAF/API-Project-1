import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import { thunkCreateReview } from "../../../store/reviews.js";
import { thunkGetReviews } from "../../../store/reviews.js";
import { thunkGetDetailsSpot } from "../../../store/spots.js";
import { useModal } from "../../../context/Modal.jsx";
import "./CreateReview.css";


export const CreateReview = ({ spotId }) => {
  spotId = Number(spotId);
  const dispatch = useDispatch();


  const currUser = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews);

  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});

  console.log("REVIEWS IN CREATE REVIEWS", reviews);

  const user = {
    id: currUser.id,
    firstName: currUser.firstName,
    lastName: currUser.lastName,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errObj = {};


    if (review.length < 10) {
      errObj.review = "Review must be at least 10 characters";
    }
    if (!stars || stars === 0) {
      errObj.stars = "Must have at least 1 star!";
    }
    if (currUser.id === currSpot.ownerId) errObj.same = "same user";

    setErrors(errObj);

    const createdReview = {
      userId: user.id,
      spotId: spotId,
      review,
      stars,
    };




     await dispatch(thunkCreateReview(spotId, user, createdReview));




    setReview("");
    setStars(0);
    closeModal();

    dispatch(thunkGetReviews(spotId));
    dispatch(thunkGetDetailsSpot(spotId));


  };
console.log('ERRORS',errors,'STARS',stars)

  return (
    <div className="create-review-container">
      <div className="cr-title-cont">How was your stay?</div>
      {Object.values(errors).length > 0 && Object.values(errors).map((err,i )=> <p key={i} className='err-cont'>{err}</p>)}
      <form className="form-cr-cont" onSubmit={onSubmit}>
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <ul className="star-container" style={{'listStyle': 'none'}}>
          <li className="stars-text">Stars</li>
          <li onMouseEnter={() => setStars(5)}>
            <i
              className={`fa fa-star ${stars >= 5 ? "filled" : "empty"}`}
            ></i>
          </li>
          <li onMouseEnter={() => setStars(4)}>
            <i
              className={`fa fa-star ${stars >= 4 ? "filled" : "empty"}`}
            ></i>
          </li>
          <li onMouseEnter={() => setStars(3)}>
            <i className={`fa fa-star ${stars >= 3 ? "filled" : "empty"}`}></i>
          </li>
          <li onMouseEnter={() => setStars(2)}>
            <i className={`fa fa-star ${stars >= 2 ? "filled" : "empty"}`}></i>
          </li>
          <li onMouseEnter={() => setStars(1)}>
            <i className={`fa fa-star ${stars >= 1 ? "filled" : "empty"}`}></i>
          </li>
        </ul>

        <button
          className='review-submit-btn'
          disabled={review.length < 10 || stars === ""}
        >
          Submit your review
        </button>
      </form>
    </div>
  );
};
