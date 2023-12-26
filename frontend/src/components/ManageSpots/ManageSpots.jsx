import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { thunkLoadCurrSpots } from "../../store/spots";
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import {DeleteSpot} from "./DeleteSpot/DeleteSpot"
import { useEffect, useState} from "react";
import './ManageSpots.css';
import './DeleteSpot/DeleteSpot.css'
import { thunkDeleteSpot, thunkGetAllSpots  } from "../../store/spots";


export const ManageSpots = () =>{



    // const dispatch = useDispatch();
    const navigate = useNavigate()

    const allSpots = useSelector(state => state.spots);
    const users = useSelector(state => state.session.user)
    let user;
    // console.log('users',users)
    if(!users) navigate('*')
    // !users? navigate('*') : null
    users ?  user = users.id : null
    // console.log('USERS',users)
    // const user = users.id

    const filteredSpots = Object.values(allSpots).filter(spot => spot.ownerId === user)
    const [spots, setCurrSpots] = useState(filteredSpots)
    const dispatch = useDispatch()


    // console.log('SPOTS FIRST',spots, 'FILTERED SPOTS FIRST', filteredSpots, 'ALL SPOTS FIRST',allSpots)

    useEffect(() =>{
        dispatch(thunkGetAllSpots())
        // console.log('SPOTS SECOND',spots, 'FILTERED SPOTS SECOND', filteredSpots, 'ALL SPOTS SECOND',allSpots)
    },[dispatch])


    const handleOnClick = () =>{

        navigate(`/spots/new`)
    }

   const onClickNav = (id) => {
    // console.log('ID',id)
        navigate(`/spots/${id}`)

    }

    const onDelete = async(spotId) =>{
        await dispatch(thunkDeleteSpot(spotId))

        const updatedSpots = spots.filter((spot) => spot.id !== spotId);
        setCurrSpots(updatedSpots)

    }

    // console.log('SPOTS IN MANAGE',spots)

    // if(!spots) return null
    // if(filteredSpots.length === 0){
    //     // console.log('SPOTS THIRD',spots, 'FILTERED SPOTS THIRD', filteredSpots, 'ALL SPOTS THIRD',allSpots)
    //     return null
    // }
    // console.log('SPOTS FOURTH',spots, 'FILTERED SPOTS FOURTH', filteredSpots, 'ALL SPOTS FOURTH',allSpots)

    return(
        <div className='curr-main-container'>
            <div className='curr-text-header' >
                <h1>Manage Your Spots</h1>
                <button className='curr-new-spot-bttn' onClick={handleOnClick}>Create a New Spot</button>
                {/* < NavLink className='nav-link' to="/spots/new" >Create a New Spot</ NavLink > */}
            </div>

            <div className ='curr-spot-container' >
            {/* { spots.length > 0 && spots.map(spot =>( */}
            { filteredSpots.map(spot =>(
                        <div key={spot.id} className='manage-spot-tile'>

                         {spot.previewImage ? (
                            <img className='manage-img' src={spot.previewImage} onClick={() => onClickNav(spot.id)} onError={e => {
                        e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
                    }} />

                    ) : (
                        <img
                        className='manage-img'
                          src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"
                          alt="Fallback Image"
                          onClick={() => onClickNav(spot.id)}
                        />
                      )}

                        <div className='manage-city-stars' onClick={() => onClickNav(spot.id)}>
                            <div>{spot.city}, {spot.state}</div>
                            <div>&#9733; {spot.avgRating && spot.avgRating.toFixed(1)}</div>

                        </div>
                            <div className='manage-price'onClick={() => onClickNav(spot.id)}>${spot.price.toFixed(2)} night</div>


                            <div className='curr-bttn-container'>

                            <button onClick={() => navigate(`/spots/${spot.id}/edit`)}>
                                Update</button>



                                { <OpenModalButton

                                    buttonText='Delete'

                                    modalComponent={<DeleteSpot id={spot.id} onDelete={onDelete}/>}
                                /> }



                            </div>

                        </div>
                    ) )}

            </div>

        </div>
        )
    }
