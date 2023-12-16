import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteSpot } from "../../../store/spots";
import "./DeleteSpot.css";

export const DeleteSpot = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const spot = useSelector((state) => state.spots[id]);
<<<<<<< HEAD
  // const spotID = Number (spot.id)
=======
  const spotID = Number (spot.id)
>>>>>>> 9b4df69a61b076f5630e4767d6249e2e1da0ec40

  if(!spot)return null

  const removeSpot = async () => {
<<<<<<< HEAD
    // console.log('SPOTID',spot.id)
=======
    console.log('SPOTID',spot.id)
>>>>>>> 9b4df69a61b076f5630e4767d6249e2e1da0ec40
    await dispatch(thunkDeleteSpot(spot.id));


    closeModal();
  };

  return (
    <>
      <div className="delete-main-container">
        <div>Confirm Delete</div>
        <div>Are you sure you want to delete this review?</div>
        <div className="delete-button-container">
          <button onClick={removeSpot}>Yes (Delete Spot)</button>
          <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
      </div>
    </>
  );
};
