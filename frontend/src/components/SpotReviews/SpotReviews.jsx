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
    dispatch(thunkGetReviews(spotId))
    // if(!res.ok){

    //   console.log("issue with useEffect dispatch")
    // }
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




return(
  <>

    {reviewSumCreator()}

    <div className='review-list-container' >
      {
      reviewsArr.map(review =>(
        <div className='indie-review-container' key={review.id}>
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
