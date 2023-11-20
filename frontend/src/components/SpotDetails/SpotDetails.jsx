import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { thunkGetDetailsSpot } from '../../store/spots';

export const SpotDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams()
    console.log('this is id',id)

    const spotDetails = useSelector(state => state.spots)
    console.log("!!!!!!this is spot details",spotDetails)

    useEffect(() =>{
        dispatch(thunkGetDetailsSpot(id))
    },[dispatch,id])


    return(
        <h1>This is from SingleSpot</h1>
    )

}
