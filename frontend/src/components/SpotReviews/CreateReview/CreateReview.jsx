import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { thunkCreateReview } from "../../../store/reviews.js";
import { useModal } from "../../../context/Modal.jsx";
import "./CreateReview.css";




export const CreateReview = ({spotId}) => {
  // const {id}  = useParams(); // <- this seems to not work bc there isn't a route. maybe findSpot instead?
   spotId =  Number(spotId)
  const dispatch = useDispatch();

  const reviews = useSelector(state => state.reviews)

  const [review, setReview] = useState("");
  const [validations, setValidations] = useState({});
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({})
  const maxStars = [1, 2, 3, 4, 5];

//   const [blackStars, setBlackStars] = useState(0)


    const currUser = useSelector((state) => state.session.user)
    const currSpot = useSelector((state) => state.spots)


    const user = {
        id:currUser.id,
        firstName:currUser.firstName,
        lastName:currUser.lastName
    }

useEffect(() =>{
        const errObj = {};


        if (review.length < 10) {
          errObj.review = "Review must be at least 10 characters";


        }
        if (stars === 0) {
          errObj.stars = "Must have at least 1 star!";

        }
        if(currUser.id === currSpot.ownerId ) errObj.same = "same user"

        setValidations(errObj);
},[review,stars,currUser])



  const onSubmit = async (e) => {
    e.preventDefault();
    // const errObj = {};

    const createdReview = {
      userId:user.id,
      spotId:spotId,
      review,
      stars,
    }
    console.log('CREATED REVIEW', createdReview)


        await dispatch(thunkCreateReview(spotId, user, createdReview));



        setReview("");
        setStars(0);
        closeModal();

        // return () => dispatch(thunkGetReviews(spotId))

  };






  return (
    <>

      <div className="create-review-container">
        <h1>How was your stay?</h1>
        {Object.keys(errors) && <div>User cannot post more than one review</div>}

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
              disabled={validations.review || validations.stars || errors.same}
            >
              Submit Your Review
            </button>
          </div>
        </form>
      </div>

    </>
  );
};
