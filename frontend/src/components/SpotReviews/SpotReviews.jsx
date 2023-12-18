import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { clearState, thunkGetReviews } from "../../store/reviews"
import { dateFormater } from "./SpotReviewFuncs";
import { DeleteReview } from "./DeleteReview";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import './SpotReviews.css'

export function SpotReviews({currSpotId, ownerId, avgRating, numReviews}){


  const reviews = useSelector(state => state.reviews)
  const {id} = useParams();
  // const spot = useSelector(state => state.spots[currSpotId])
  const spotId = id
  console.log('SPOTID', spotId)

  console.log('REVIEWS',reviews)
  let currUserId = useSelector(state => state.session.user?.id)

  // currUserId ? currUserId = currUserId.id : null
  const reviewsArr = Object.values(reviews)
  const dispatch = useDispatch()

  console.log('SPOTID',spotId ,'OWNERID',ownerId ,'AVGRATE',avgRating,'NUMREVIEWS',numReviews,'CURRUSER',currUserId,'CURRSPOTID',currSpotId)
  // console.log('USER', userArr)
  console.log('REVIEWSARR',reviewsArr,'REVIEWS',reviews)



  useEffect(() => {
    console.log('SPOT AT SPOTID UE', spotId)
    dispatch(thunkGetReviews(spotId))

      return () => dispatch(clearState()) // clean up function to return empty obj after leaving page

  },[spotId,dispatch])



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



const addReviewClick = () =>{
  const hasReview = reviewsArr.find(obj => obj.userId === currUserId )
  console.log('HASREVIEW',hasReview)
  if(!hasReview && ownerId !== currUserId || !currUserId){
    return(
      <div className="create-review-bttn-container">
        <button>Post Your Review</button>

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
