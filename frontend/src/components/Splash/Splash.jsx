import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { loadSpots, thunkGetAllSpots } from '../../store/spots';
import './Splash.css';

export const Splash = () =>{
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.Spots)
    // const spots = useSelector(state => state.spots)
    console.log('!!!!!this is state',spots)

    useEffect(() =>{
        dispatch(thunkGetAllSpots())


    },[dispatch])
    // https://miro.medium.com/v2/resize:fit:1358/1*RlvEvBN5QszQoqjsuWOH6A.gif

    return (
        <div>
            <div>
                <div className='spots-main-container'>
                    { spots && spots.map(spot =>(
                        <div key={spot.id} className='spot-tile'>
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
                            <div className='tool-tip'>{spot.name}</div>

                        </div>
                    ) )}
                </div>

            </div>


        </div>
    )
}
