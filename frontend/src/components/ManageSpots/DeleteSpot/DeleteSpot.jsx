import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteSpot } from "../../../store/spots";
import "./DeleteSpot.css";

export const DeleteSpot = ({ id, onDelete }) => {
  id = Number(id)
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [spotId,setSpotId] = useState(id)
  console.log('id', id, 'spotId', spotId)
  // const spot = useSelector((state) => state.spots);
  // const spotID = Number (spot.id)
  // console.log('SPOT', spot)
  // if(!spot)return null

  const removeSpot = async () => {
    // console.log('SPOTID',spot.id)
    // await dispatch(thunkDeleteSpot(spotId));

      // return () => dispatch(loadCurrentSpots())
      // setSpotId("")
      console.log(spotId)
      onDelete(spotId);
      closeModal();
  };

  return (
    <>
      <div className="delete-main-container" >
        <div>Confirm Delete</div>
        <div>Are you sure you want to delete this spot?</div>
        <div className="delete-button-container">
          <button onClick={removeSpot}>Yes (Delete Spot)</button>
          <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
      </div>
    </>
  );
};
