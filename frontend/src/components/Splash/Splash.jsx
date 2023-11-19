import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { loadSpots, thunkGetAllSpots } from '../../store/spots';


export const Splash = () =>{
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.Spots)
    console.log('!!!!!this is state',spots)

    useEffect(() =>{
        dispatch(thunkGetAllSpots())


    },[dispatch])
    // https://miro.medium.com/v2/resize:fit:1358/1*RlvEvBN5QszQoqjsuWOH6A.gif

    return (
        <div>
            <h1>This is from splash</h1>
            <div>
                <div>
                    { spots && spots.map(spot =>(
                        <div key={spot.id}>
                         {spot.previewImage ? (
                            <img src={spot.previewImage} onError={e => {
                        e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
                    }} />
                    ) : (
                        <img
                          src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"
                          alt="Fallback Image"
                        />
                      )}
                        <div>
                            <div>{spot.city}, {spot.state}</div>
                            <div>&#9733; {spot.avgRating}</div>

                        </div>
                            <div>${spot.price} night</div>

                        </div>
                    ) )}
                </div>

            </div>


        </div>
    )
}
