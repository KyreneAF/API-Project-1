import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
// import { thunkDeleteSpot } from "../../../store/spots";
import "./DeleteSpot.css";
// import './ManageSpots.css'

export const DeleteSpot = ({ id, onDelete }) => {
  id = Number(id)

  const { closeModal } = useModal();
  const [spotId] = useState(id)


  const removeSpot = async () => {


      onDelete(spotId);
      closeModal();
  };

  return (
    <>
      <div className="delete-main-container" >
        <div className='delete-title-cont-ms' >Confirm Delete</div>
        <div className='delete-text-cont-ms' >Are you sure you want to remove this spot from the listings?</div>
        <div className="delete-button-container">
          <button className='yes-delete'onClick={removeSpot}>Yes (Delete Spot)</button>
          <button className='no-delete'onClick={closeModal}>No (Keep Spot)</button>
        </div>
      </div>
    </>
  );
};
