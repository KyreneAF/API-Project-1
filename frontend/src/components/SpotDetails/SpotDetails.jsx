import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetDetailsSpot } from "../../store/spots";
import { SpotReviews } from "../SpotReviews/SpotReviews";
import "./SpotDetails.css";

export const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // const spotDetails = useSelector((state) => state.spots[id]);
  const spots = useSelector(state => state.spots)
  const spotDetails =spots[id]



  useEffect(() => {
    dispatch(thunkGetDetailsSpot(id));
  }, [dispatch, id]);

  // console.log("THIS IS SPOTDETAILS", spotDetails);
  if (!spotDetails || spotDetails.SpotImages.length === 0) {
    return null;
  }



  const imageContCreator = () =>{

    const bigImg = spotDetails.SpotImages[0]
    // console.log('BIG IMG', bigImg)
    const smallImgs = spotDetails.SpotImages.slice(1)
    // console.log('small img', smallImgs)

    return(
      <div className="spot-img-container">
        <div className='big-img-container'>
          <img className="big-img" src={bigImg.url}
              onError={e => e.target.src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"}
          />
        </div>

        <div className='smallImgs-main-container'>
          {
            smallImgs.map(imgObj =>(
              <div className='indie-smallImg-cont' key={imgObj.id}>
              <img className='small-img' src={imgObj.url}
              onError={e => e.target.src="https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0"}

              />
            </div>

            ))
          }

        </div>
      </div>
    )

  }





  return (
    <div className="spot-main-container">
      {spotDetails && (
        <>
          <div className="spot-info">
            <div className="title">{spotDetails.name}</div>
            <div>
              {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
            </div>
          </div>

            {imageContCreator()}

          <div
            className="text-main-container"
            style={{ borderBottom: " 1px solid rgba(0, 0, 0, 0.3)" }}
          >
            <div className="host-deets-container">
              <div
                className="host-name-container"
                style={{ fontWeight: "bold" }}
              >
                <div>
                  Hosted By {spotDetails.Owner.firstName}{" "}
                  {spotDetails.Owner.lastName}
                </div>
              </div>
              <div className="desc-container">
                <div>{spotDetails.description}</div>
              </div>
            </div>

            <div className="reserve-main-container">
              <div className="price-container">

                <div className='left-cont'>
                  <div>${spotDetails.price.toFixed(2)} night</div>

                </div>

                <div className='right-cont'>
                  <div>&#9733; {spotDetails.avgRating && spotDetails.avgRating.toFixed(1)} </div>
                  <div>{spotDetails.numReviews} reviews</div>

                </div>


              </div>
              <button onClick={() => window.alert("Feature Coming Soon...")}>
                Reserve
              </button>
            </div>
          </div>

          <div className="review-main-container">

            <SpotReviews  ownerId={spotDetails.ownerId} avgRating={spotDetails.avgRating} numReviews={spotDetails.numReviews}/>
          </div>
        </>
      )}
    </div>
  );
};
