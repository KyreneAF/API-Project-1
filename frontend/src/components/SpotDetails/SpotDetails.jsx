import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { thunkGetDetailsSpot } from '../../store/spots';
import './SpotDetails.css'

export const SpotDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    console.log('this is id',id)

    const spotDetails = useSelector(state => state.spots.spot)
    console.log("!!!!!!this is spot details",spotDetails)

    useEffect(() =>{
        dispatch(thunkGetDetailsSpot(id))
    },[dispatch,id])




    return(
        <div>
            {spotDetails && (
                <>
            <div className='spot-img-container'>
                {
                    spotDetails.SpotImages.map(imgObj =>(
                        <div key={imgObj.id} className={`img-div-${imgObj.id}`}>
                            {imgObj.url && (
                                <img className='single-img' src={imgObj.url} onError={e => {
                                    e.target.src = 'https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0';
                                }}/>
                            )}
                        </div>

                    ))
                }

            </div>
            <div className='text-main-container' >
            <div className='host-name-container' style={{fontWeight: 'bold'} } >
                <div>Hosted By {spotDetails.Owner.firstName} {spotDetails.Owner.lastName}</div>

            </div>
            <div className='desc-container' >
                <div>{spotDetails.description}</div>
            </div>

            <div className='reserve-main-container' >
                <div style={{fontWeight: 'bold'}}>${spotDetails.price} night</div>
                <div>&#9733;{spotDetails.avgRating}</div>
                <div>{spotDetails.numReviews} reviews</div>
                <button onClick={() =>window.alert('Feature Coming Soon...')}>Reserve</button>

            </div>



            </div>
            </>
            )}
        </div>
    )

}
