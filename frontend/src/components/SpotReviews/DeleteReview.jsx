import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteReview } from "../../store/reviews"
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkGetDetailsSpot } from "../../store/spots";


export function DeleteReview({currUserId,id,reviewOwner}){
    // console.log('CURRUSERID', currUserId, 'ID', id, 'OWNER ID', reviewOwner)

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const reviews = useSelector(state => state.reviews)
    // const spots = useSelector(state => state.spots)
    // console.log('review',reviews)
    // console.log('REVIEWS BEFORE DISPATCH',reviews)

    // let newReviews = {...reviews}
    // console.log('NEW REVIEWS BEFORE', newReviews)
    // console.log('CHECKING KEY',newReviews[id] )
    // delete newReviews[id]
    // console.log('NEW REVIEWS AFTER', newReviews)
    // console.log('FINAL NEW REVIEWS',newReviews)
        // Update the local state when the id prop changes


    // console.log('!!!!!!! REVIEW ID',reviews[id].id)

    const onClickDelete = async (e) =>{
        e.preventDefault();
         await dispatch(thunkDeleteReview(reviews[id].id))
        //  console.log('REVIEWID AFTER DISPATCH',reviews)
        await dispatch(thunkGetDetailsSpot(id)).then(() =>{
          closeModal()
        })



    }

    const onModalOpen = () => {
        return(
            <div className="delete-review-main-container">
            <div>Confirm Delete</div>
           <div>Are you sure you want to delete this review?</div>
           <div className="delete-review-button-container">
             <button onClick={onClickDelete}>Yes (Delete review)</button>
             <button onClick={closeModal}>No (Keep review)</button>
           </div>
         </div>

        )
    }


    return(
        <>
        <OpenModalButton
          buttonText='Delete'
          modalComponent={onModalOpen}
        />

       </>
    )
}
