import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { thunkGetReviews } from "../../store/reviews"
import { dateFormater } from "./SpotReviewFuncs";


export function SpotReviews({spotId, ownerId, avgRating, numReviews}){

  const reviews = useSelector(state => state.reviews[spotId])
  const currUserId = useSelector(state => state.session.user.id)
  let allReviews = reviews && Object.values(reviews)
  console.log('ALLREIVEWS',allReviews, 'REVIEWS',reviews)
  const dispatch = useDispatch()


  useEffect(() => {
    const res = dispatch(thunkGetReviews(spotId))
    if(!res.ok){

      console.log("issue with useEffect dispatch")
    }

  },[dispatch,spotId])



const reviewSumCreator =  () => {

  if(!reviews && ownerId !== currUserId){
   return <h3>Be the first to post a review!</h3>
  }else{
    return(
    <>
    <div classNme="star-avgRate-con" >
      <div>&#9733;</div>
      {/* <i className="fa-solid fa-star"></i> */}
      <div>{ avgRating && avgRating.toFixed(1)}</div>
    </div>
    <div>&middot;</div>
    <div>
      {numReviews} reviews
    </div>
    </>
    )
  }
}





if(!allReviews || !allReviews.length || !reviews) return null

return(
  <div className='reviews-main-container' >
    <div className='rating-sum-container' >
      {reviewSumCreator()}
    </div>

    <div className='reviews-container' >
        {
          allReviews.map(reviewObj =>(
            <div className='indi-review-cont' key={reviewObj.id} >
            {/* <h3>{reviewObj.firstName}</h3> */}
            <p>dateFormater{reviewObj}</p>
            <h3>{reviewObj.review}</h3>
            <button>Delete</button>
            </div>
          ))
        }


    </div>

  </div>

)

}

























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
