import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkLoadCurrSpots } from "../../store/spots";
import { useEffect } from "react";

export const ManageSpots = () =>{



    const dispatch = useDispatch();
    const navigate = useNavigate()

    const spots = useSelector(state => state.spots);
    console.log("state from ManageSpots",spots)


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
                <button className='new-spot-bttn' onClick={handleOnClick}></button>
            </div>

            <div className ='curr-spot-container'>
            { spots.Spots && spots.Spots.map(spot =>(
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

                            <button onClick={() => navigate(`spots/${spot.id}/delete`)}>
                                Delete
                            </button>

                            </div>

                        </div>
                    ) )}

            </div>



        </div>
        )
    }








// return (
//     <>
//       <div className='text-header-ms'>
//         <h1>Manage Your Spots</h1>
//         <div className='new-spot-bttn'>
//           <button onClick={() => navigate('/spots/new')}>
//             Create a New Spot
//           </button>
//         </div>
//       </div>
//       <div className="curr-spots-container">
//         {allSpots && allSpots.map((spot) => (
//           <div key={spot.id} className='spot-tile'>
//             {spot.previewImage ? (
//               <img
//                 className='img'
//                 src={spot.previewImage}
//                 onError={(e) => {
//                   e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
//                 }}
//               />
//             ) : (
//               <img
//                 className='img'
//                 src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"
//                 alt="Fallback Image"
//               />
//             )}
//             <div className='city-stars'>
//               <div>{spot.city}, {spot.state}</div>
//               <div>&#9733; {spot.avgRating}</div>
//             </div>
//             <div className='price'>${spot.price} night</div>
//           </div>
//         ))}
//       </div>
//       <div className="curr-spot-container">
//         <div className='curr-bttn-container'>
//           {/* <button onClick={() => navigate(`spot/${}/update`)}>Update</button> */}
//           <button>Delete</button>
//         </div>
//       </div>
//     </>
//   );
