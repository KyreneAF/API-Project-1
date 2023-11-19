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
    https://miro.medium.com/v2/resize:fit:1358/1*RlvEvBN5QszQoqjsuWOH6A.gif

    return (
        <div>
            <h1>This is from splash</h1>
            <div>
                <div>
                    { spots && spots.map(spot =>(
                        <div key={spot.id}>
                            <img src={spot.previewImage} onError={e => {
                        e.target.src = 'https://miro.medium.com/v2/resize:fit:1358/1*RlvEvBN5QszQoqjsuWOH6A.gif';
                    }} />
                        <div>
                            <div>{spot.city}, {spot.state}</div>
                            <div>&#9733; {spot.avgRating}</div>

                        </div>
                        </div>
                    ) )}
                </div>

            </div>


        </div>
    )
}
