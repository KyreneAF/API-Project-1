import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { thunkGetReviews } from "../../store/reviews"
import { dateFormater } from "./SpotReviewFuncs";
import './SpotReviews.css'

export function SpotReviews({spotId, ownerId, avgRating, numReviews}){


  const reviews = useSelector(state => state.reviews)
  let currUserId = useSelector(state => state.session.user?.id)

  // currUserId ? currUserId = currUserId.id : null
  const reviewsArr = Object.values(reviews)
  const dispatch = useDispatch()

  // console.log('SPOTID',spotId ,'OWNERID',ownerId ,'AVGRATE',avgRating,'NUMREVIEWS',numReviews,'CURRUSER',currUserId)
  // console.log('USER', userArr)
  // console.log('REVIEWSARR',reviewsArr,'REVIEWS',reviews)



  useEffect(() => {
    const res = dispatch(thunkGetReviews(spotId))
    // if(!res.ok){

    //   console.log("issue with useEffect dispatch")
    // }
  })



const reviewSumCreator =  () => {


  if(!reviewsArr.length && ownerId !== currUserId){
   return <h3>Be the first to post a review!</h3>
  }else{
    return(
      <div className='rating-sum-container' >

      {/* <div>&#9733;</div> */}
      <i className="fa-solid fa-star"></i>
     <div>{ avgRating && avgRating.toFixed(1)}</div>

    <div>&middot;</div>
    <div>
      {numReviews} reviews
    </div>

    </div>

    )
  }
}




return(
  <>

    {reviewSumCreator()}

    <div className='review-list-container' >
      {
      reviewsArr.map(review =>(
        <div className='indie-review-container'>
        <p>{review.User.firstName}</p>
        <div>{dateFormater({review})}</div>
        <p>{review.review}</p>
        {review.userId === currUserId && <button>Delete</button>}
        </div>
      ))
      }

    </div>

  </>

)}
























// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { thunkGetReviews } from "../../store/reviews";
// import { dateFormater } from "./SpotReviewFuncs";
// import { useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton/OpenModalButton";
// import { CreateReview } from "../CreateReview/CreateReview";

// export const SpotReviews = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});

//   const spotReview = useSelector((state) => state.reviews);
//   const currSpot = useSelector((state) => state.spots.spot);
//   const currUser = useSelector((state) => state.session.user);
//   //   console.log("this is spotReview", spotReview);
//   // console.log('!!!',currSpot.ownerId,currUser)

//   useEffect(() => {
//     dispatch(thunkGetReviews(id));
//   }, [dispatch, id]);


//   useEffect(() => {
//     const errObj = {};

//     if (currSpot.ownerId === currUser.id) errObj.same = "same user";

//     setErrors(errObj);
//   }, [currSpot.ownerId, currUser.id]);

//   return (
//     <>
//       <div className="post-review-bttn">
//         {!errors.same && (
//           <OpenModalButton
//             buttonText="Post Your Review"
//             modalComponent={<CreateReview />}
//           />
//         )}
//       </div>
//       {!spotReview.reviews ? (
//         <div>Be the first to post a Review!</div>
//       ) : (
//         <>
//           <div className="reviews-main-container">
//             <div className="indie-review-container">
//               {spotReview.reviews &&
//                 spotReview.reviews.map((review) => (
//                   // spotReview.reviews.map((review) => (
//                   <div key={review.id}>
//                     <div className="first-name">{review.User.firstName} </div>
//                     <div style={{ color: "gray" }}>{dateFormater(review)}</div>
//                     <div>{review.review}</div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };
