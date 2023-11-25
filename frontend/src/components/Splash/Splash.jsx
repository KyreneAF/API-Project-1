import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {thunkGetAllSpots } from '../../store/spots';
import {useNavigate} from 'react-router-dom';
// import {SpotDetails} from '../Splash/Splash';
import './Splash.css';

export const Splash = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const spots = useSelector(state => state.spots.Spots)
    // const spots = useSelector(state => state.spots)

// console.log('this is state!!!!!!!!',spots)

    useEffect(() =>{
        dispatch(thunkGetAllSpots())


    },[dispatch])


    const handleOnClick = (id) =>{

        navigate(`/spots/${id}`)
    }


    return (
        <div>
            <div>
                <div className='spots-main-container'>
                    { spots && spots.map(spot =>(
                        <div key={spot.id} className='spot-tile' onClick={() => handleOnClick(spot.id)}>
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
                            <div>&#9733; {spot.avgRating.toFixed(1)}</div>

                        </div>
                            <div className='price'>${spot.price.toFixed(2)} night</div>
                            <div className='tool-tip'>{spot.name}</div>

                        </div>
                    ) )}
                </div>

            </div>


        </div>
    )
}
