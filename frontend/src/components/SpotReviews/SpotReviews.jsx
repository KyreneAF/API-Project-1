import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { clearState, thunkGetReviews } from "../../store/reviews"
import { dateFormater } from "./SpotReviewFuncs";
import { DeleteReview } from "./DeleteReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { CreateReview } from "./CreateReview/CreateReview";
import './SpotReviews.css'
import '../OpenModalButton/OpenModalButton.css'

export function SpotReviews({ ownerId, avgRating, numReviews}){


  const reviews = useSelector(state => state.reviews)
  const {id} = useParams();
  const spotId = id
  let currUserId = useSelector(state => state.session.user?.id)


  const reviewsArr = Object.values(reviews).sort()
  const dispatch = useDispatch()

  // console.log('SPOTID',spotId ,'OWNERID',ownerId ,'AVGRATE',avgRating,'NUMREVIEWS',numReviews,'CURRUSER',currUserId,)
  // console.log('REVIEWSARR',reviewsArr,'REVIEWS',reviews)



  useEffect(() => {

    dispatch(thunkGetReviews(spotId))

      return () => dispatch(clearState()) // clean up function to return empty obj after leaving page

  },[spotId,dispatch])



const reviewSumCreator = () => {


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



const addReviewClick =  () =>{
  const hasReview = reviewsArr.find(obj => obj.userId === currUserId )

  if(!hasReview && ownerId !== currUserId && currUserId !== undefined){
    return(
      <div >
      { <OpenModalButton

          buttonText='Post Your Review'
          modalComponent={<CreateReview spotId={spotId}/>}
      /> }

  </div>
    )
  }


}




return(
  <>

    {reviewSumCreator()}
    {addReviewClick()}

    <div className='review-list-container' >
      {
      reviewsArr.map(review =>(
        <div className='indie-review-container' key={review.id}>
        <p className="name-p">{review.User.firstName}</p>
        <div className='date'>{dateFormater({review})}</div>
        <div className='review-cont'>{review.review}</div>
        {/* {review.userId === currUserId && <button>Delete</button>} */}
        {/* {review.userId === currUserId &&
        // <DeleteReview currUserId={review.userId} id={review.id} reviewOwner={review.userId} />
         <OpenModalButton
          buttonText='Delete'
          modalComponent={<DeleteReview currUserId={review.userId} id={review.id} reviewOwner={review.userId}/>}
        />

        } */}
        {review.userId === currUserId && <DeleteReview currUserId={review.userId} id={review.id} reviewOwner={review.userId}/>}
        </div>
      ))
      }

    </div>

  </>

)}
