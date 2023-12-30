import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteReview } from "../../store/reviews"
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { thunkGetDetailsSpot } from "../../store/spots";
import './DeleteReview.css'

export function DeleteReview({id,spotId}){

    console.log(id)
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const reviews = useSelector(state => state.reviews)
    const spotIdConvert = Number(spotId)
    console.log('spotId',spotIdConvert)


    const onClickDelete = async (e) =>{
        e.preventDefault();
         await dispatch(thunkDeleteReview(reviews[id].id))

        await dispatch(thunkGetDetailsSpot(spotId)).then(() =>{
          closeModal()
        })



    }

    const onModalOpen = () => {
        return(
            <div className="delete-review-main-container">
            <div className='rd-title' >Confirm Delete</div>
           <div>Are you sure you want to delete this review?</div>
           <div className="delete-review-button-container">
             <button className='yes-delete' onClick={onClickDelete}>Yes (Delete review)</button>
             <button className='no-delete' onClick={closeModal}>No (Keep review)</button>
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
