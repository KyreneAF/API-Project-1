import { useDispatch, useSelector } from "react-redux";
// import {  } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteSpot, thunkLoadCurrSpots } from "../../../store/spots";
import "./DeleteSpot.css";

export const DeleteSpot = () => {

  const dispatch = useDispatch();
//   const navigate = useNavigate();
  const {closeModal} = useModal();
  const { id } = useParams();
  const spotId = Number(id);

  const spot = useSelector(state => state.spots )


    const removeSpot = async (e) => {
      e.preventDefault();

      await dispatch(thunkDeleteSpot(spotId))

    };

  return (
    <>
      <div className="delete-main-container">
        <div>Confirm Delete</div>
        <div>Are you sure you want to delete this review?</div>
        <div className="delete-button-container">
          <button onClick={removeSpot()}   >Yes (Delete Spot)</button>
          <button onClick={closeModal}  >No (Keep Spot)</button>
        </div>
      </div>
    </>
  );


};
