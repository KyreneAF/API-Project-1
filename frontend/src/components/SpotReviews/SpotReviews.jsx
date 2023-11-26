import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { thunkGetReviews } from "../../store/reviews";
import { dateFormater } from "./SpotReviewFuncs";
import { useParams } from "react-router-dom";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { CreateReview } from "../CreateReview/CreateReview";

export const SpotReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [errors,setErrors] = useState({})//for useEffect but it doesnt work


  const spotReview = useSelector((state) => state.reviews);
  const currSpot = useSelector((state) => state.spots.spot)
  const currUser = useSelector((state) => state.session.user)
  //   console.log("this is spotReview", spotReview);
  // console.log('!!!',currSpot.ownerId,currUser)

  useEffect(() => {
    dispatch(thunkGetReviews(id));
  }, [dispatch, id]);



  // THIS ALMOST WORKS BUT IT WILL NOT LET ME SUBMIT  REVIEW... IM GOING TO TRY AND FIND ERRORS RETURNING FROM API AND USE THOSE TO STOP BUTTON EXECUTION
// useEffect(() => {

// // console.log('inside useEffect !!!!!!', spotReview)
//   const validPoser = spotReview.reviews.some(
//     (review) =>
//       review.userId === currUser.id || currSpot.ownerId === currUser.id
//   );

//   setBoolean(!validPoser);
// }, [spotReview, currUser, currSpot]);
useEffect(() => {
  const errObj = {};


  if(currSpot.ownerId === currUser.id) errObj.same = "same user"

  setErrors(errObj);
}, [currSpot.ownerId, currUser.id]);




  return (
    <>
      <div className="post-review-bttn">
        { !errors.same  && (
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={<CreateReview />}
            />
          )}
      </div>
      {!spotReview.reviews ? (
        <div>Be the first to post a Review!</div>
      ) : (
        <>
          <div className="reviews-main-container">
            <div className="indie-review-container">
              {spotReview.reviews &&
              spotReview.reviews.map((review) => (
                // spotReview.reviews.map((review) => (
                  <div key={review.id}>
                    <div className="first-name">{review.User.firstName} </div>
                    <div style={{ color: "gray" }}>{dateFormater(review)}</div>
                    <div>{review.review}</div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
