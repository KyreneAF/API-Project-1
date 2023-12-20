import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCurrSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import {DeleteSpot} from "./DeleteSpot/DeleteSpot"
import { useEffect } from "react";
import './ManageSpots.css';


export const ManageSpots = () =>{



    const dispatch = useDispatch();
    const navigate = useNavigate()

    const allSpots = useSelector(state => state.spots);
    const user = useSelector(state => state.session.user.id)

    const spots = Object.values(allSpots).filter(spot => spot.ownerId === user)

    // if(!spots) return null

    useEffect(() =>{
        dispatch(thunkLoadCurrSpots())
    },[dispatch])


    const handleOnClick = () =>{

        navigate(`/spots/new`)
    }

   const onClickNav = (id) => {
    console.log('ID',id)
        navigate(`/spots/${id}`)

    }


    if(!spots) return null

    return(
        <div className='curr-main-container'>
            <div className='curr-text-header' >
                <h1>Manage Your Spots</h1>
                <button className='curr-new-spot-bttn' onClick={handleOnClick}>Create a New Spot</button>
                {/* < NavLink className='nav-link' to="/spots/new" >Create a New Spot</ NavLink > */}
            </div>

            <div className ='curr-spot-container' >
            { spots.length && spots.map(spot =>(
                        <div key={spot.id} className='manage-spot-tile'onClick={() => onClickNav(spot.id)}>
                         {spot.previewImage ? (
                            <img className='manage-img' src={spot.previewImage} onError={e => {
                        e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
                    }} />

                    ) : (
                        <img
                        className='img'
                          src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"
                          alt="Fallback Image"
                        />
                      )}

                        <div className='manage-city-stars'>
                            <div>{spot.city}, {spot.state}</div>
                            <div>&#9733; {spot.avgRating && spot.avgRating.toFixed(1)}</div>

                        </div>
                            <div className='manage-price'>${spot.price.toFixed(2)} night</div>

                            <div className='curr-bttn-container'>

                            <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>
                                Update</button>

                            <div >
                                { <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<DeleteSpot id={spot.id}/>}
                                /> }

                            </div>

                            </div>

                        </div>
                    ) )}

            </div>

        </div>
        )
    }
