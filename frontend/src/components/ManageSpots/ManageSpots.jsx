import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCurrSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import {DeleteSpot} from "./DeleteSpot/DeleteSpot"
import { useEffect } from "react";

export const ManageSpots = () =>{



    const dispatch = useDispatch();
    const navigate = useNavigate()

    const allSpots = useSelector(state => state.spots);
    const user = useSelector(state => state.session.user.id)

    const spots = Object.values(allSpots).filter(spot => spot.ownerId === user)

    // console.log('!!!!',spots)

    useEffect(() =>{
        dispatch(thunkLoadCurrSpots())
    },[dispatch])


    const handleOnClick = () =>{

        navigate(`/spots/new`)
    }





    return(
        <div className='curr-main-container'>
            <div className='curr-text-header' >
                <h1>Manage Your Spots</h1>
                <button className='curr-new-spot-bttn' onClick={handleOnClick}>Create a New Spot</button>
            </div>

            <div className ='curr-spot-container'>
            { spots.length && spots.map(spot =>(
                        <div key={spot.id} className='spot-tile' >
                         {spot.previewImage ? (
                            <img className='img' src={spot.previewImage} onError={e => {
                        e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
                    }} />

                    ) : (
                        <img
                        className='img'
                          src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"
                          alt="Fallback Image"
                        />
                      )}

                        <div className='city-stars'>
                            <div>{spot.city}, {spot.state}</div>
                            <div>&#9733; {spot.avgRating}</div>

                        </div>
                            <div className='price'>${spot.price} night</div>

                            <div className='curr-bttn-container'>

                            <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>
                                Update</button>

                            <div >
                                { <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteSpot />}
                                /> }

                            </div>

                            </div>

                        </div>
                    ) )}

            </div>

        </div>
        )
    }
