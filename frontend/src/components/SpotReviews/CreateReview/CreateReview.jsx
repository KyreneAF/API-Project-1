import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { useParams } from "react-router-dom";
import { thunkCreateReview } from "../../../store/reviews.js";
import { thunkGetReviews } from "../../../store/reviews.js";
import { thunkGetDetailsSpot } from "../../../store/spots.js";
import { useModal } from "../../../context/Modal.jsx";
import "./CreateReview.css";
// import './OpenModalButton/OpenModalButton.css'

export const CreateReview = ({ spotId }) => {
  // const {id}  = useParams(); // <- this seems to not work bc there isn't a route. maybe findSpot instead?
  spotId = Number(spotId);
  const dispatch = useDispatch();

  // const reviews = useSelector(state => state.reviews)
  const currUser = useSelector((state) => state.session.user);
  const currSpot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews);

  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  // const maxStars = [1, 2, 3, 4, 5];

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
    // console.log('CREATED REVIEW', createdReview)



     const resReview = await dispatch(thunkCreateReview(spotId, user, createdReview));




    setReview("");
    setStars(0);
    closeModal();

    dispatch(thunkGetReviews(spotId));
    dispatch(thunkGetDetailsSpot(spotId));

    // return () => dispatch(thunkGetReviews(spotId))
  };
console.log('ERRORS',errors,'STARS',stars)

  return (
    <div className="create-review-container">
      <div className="cr-title-cont">How was your stay?</div>
      {Object.values(errors).length > 0 && Object.values(errors).map(err => <p className='err-cont'>{err}</p>)}
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
          // disabled={review.length < 10 || stars === ""}
        >
          Submit your review
        </button>
      </form>
    </div>
  );
};

// OLD CODE REFACTORING ON TOP
// export const CreateReview = ({spotId }) => {
//   // const {id}  = useParams(); // <- this seems to not work bc there isn't a route. maybe findSpot instead?
//    spotId =  Number(spotId)
//   const dispatch = useDispatch();

//   // const reviews = useSelector(state => state.reviews)

//   const [review, setReview] = useState("");
//   // const [validations, setValidations] = useState({});
//   const { closeModal } = useModal();
//   const [stars, setStars] = useState(0);
//   const [errors, setErrors] = useState({})
//   const maxStars = [1, 2, 3, 4, 5];

// //   const [blackStars, setBlackStars] = useState(0)

//     const currUser = useSelector((state) => state.session.user)
//     const currSpot = useSelector((state) => state.spots)
//     const reviews = useSelector((state) => state.reviews)

//     console.log('REVIEWS IN CREATE REVIEWS',reviews)

//     const user = {
//         id:currUser.id,
//         firstName:currUser.firstName,
//         lastName:currUser.lastName
//     }

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // const errObj = {};
//     const errObj = {};

//     if (review.length < 10) {
//       errObj.review = "Review must be at least 10 characters";

//     }
//     if (stars === 0) {
//       errObj.stars = "Must have at least 1 star!";

//     }
//     if(currUser.id === currSpot.ownerId ) errObj.same = "same user"

//     setErrors(errObj);

//     const createdReview = {
//       userId:user.id,
//       spotId:spotId,
//       review,
//       stars,
//     }
//     // console.log('CREATED REVIEW', createdReview)

//     if(Object.values(errors).length === 0){
//       console.log('ERRORS', errors)
//       await dispatch(thunkCreateReview(spotId, user, createdReview));

//     }

//     setReview("");
//     setStars(0);
//     closeModal();

//     dispatch(thunkGetReviews(spotId))
//     dispatch(thunkGetDetailsSpot(spotId))

//         // return () => dispatch(thunkGetReviews(spotId))

//   };

//   return (
//     <>

//       <div className="create-review-container">
//         <div className='cr-title-cont' >How was your stay?</div>
//         { Object.keys(errors) && <div >{Object.values(errors).map((msg,index) => <div key={index}>{msg}</div>)}</div>}

//         <form className='form-cr-cont' onSubmit={onSubmit}>
//           <textarea
//             placeholder="Leave your review here..."
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//           />

//           <div className="star-container">
//             {maxStars.map(
//               (
//                 star,
//                 index //<- only way I can think to add a unique key
//               ) => (
//                 <label key='index'>
//                 <input
//                   key={index}
//                   type="radio"
//                   name="stars"
//                   value={star}
//                   min={1}
//                   max={5}
//                   id={`star-${star}`}
//                   checked={stars === star}
//                   onChange={(e) => setStars(Number(e.target.value))}
//                 />
//                 {/* <i className="fa-light fa-star"></i> */}
//                 </label>

//               )
//             )}
//             Stars
//           </div>
//           <div>
//             <button
//             disabled={stars <= 0 || review.length < 10}
//               type="submit"
//               className="review-submit-btn"
//               // disabled={validations.review || validations.stars || errors.same}
//             >
//               Submit Your Review
//             </button>
//           </div>
//         </form>
//       </div>

//     </>
//   );
// };
