import { useDispatch} from "react-redux";

import { useModal } from "../../../context/Modal";
import { loadCurrentSpots, thunkDeleteSpot} from "../../../store/spots";
import "./DeleteSpot.css";

export const DeleteSpot = ({ id }) => {
  const dispatch = useDispatch();
    // const navigate = useNavigate();
  const { closeModal } = useModal();

//   const spot = useSelector((state) => state.spots);

//   const removeSpot = async (e) => {
//     e.preventDefault();

//     await dispatch(thunkDeleteSpot(id));

//     closeModal();
//     // navigate('/spots/current')
//   };

    // const removeSpot =  async (e) =>{
    //     e.preventDefault();
    //     await dispatch(thunkDeleteSpot(id))

    //     closeModal();
    //     dispatch(loadCurrentSpots());
    // }

  const removeSpot = () => {

    dispatch(thunkDeleteSpot(id));


    // dispatch(loadCurrentSpots());
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
