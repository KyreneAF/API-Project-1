import { useDispatch, useSelector } from "react-redux";
// import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { thunkCreateReview } from "../../../store/reviews.js";
// import { thunkGetReviews } from "../../store/reviews";
import { useModal } from "../../../context/Modal.jsx";
import "./CreateReview.css";

export const CreateReview = () => {
//   const {id}  = useParams(); // <- this seems to not work bc there isn't a route. maybe findSpot instead?
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [validations, setValidations] = useState({});
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({})
  const maxStars = [1, 2, 3, 4, 5];

//   const [blackStars, setBlackStars] = useState(0)

    const currUser = useSelector((state) => state.session.user)
    const currSpot = useSelector((state) => state.spots.spot)
    const id = currSpot.id
    // console.log(user,'Im User !!!!!!')
    // console.log("im Spot from CreateReview", currSpot)
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
},[review,stars,currSpot.ownerId,currUser.id])



  const onSubmit = async (e) => {
    e.preventDefault();
    // const errObj = {};

    // console.log(id,review,user,"From CreateReview!!!!!!!!")

    try{
        await dispatch(thunkCreateReview(id, user, {
            userId:user.id,
            spotId:id,
            review,
            stars,
          }

          )
        );
            setReview("");
            setStars(0);

            closeModal();
    }catch (res){
        if(!res.ok){
            const errData = await res.json();
            if(errData && errData.errors) setErrors(errData.errors)
            // console.log(errors,'!!!!!Hi im errors firstTine using try catch')
        }
    }

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
