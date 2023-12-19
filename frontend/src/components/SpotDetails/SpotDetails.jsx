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
  if (!spotDetails || !spotDetails.SpotImages.length) {
    return null;
  }



  const imageContCreator = () =>{

    const bigImg = spotDetails.SpotImages[0]
    console.log('BIG IMG', bigImg)
    const smallImgs = spotDetails.SpotImages.slice(1)
    console.log('small img', smallImgs)

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
{/*
          <div className="spot-img-container"> */}
            {imageContCreator()}
            {/* {spotDetails.SpotImages &&
              spotDetails.SpotImages.map((imgObj) => (
                <div key={imgObj.id}>
                  {imgObj.url &&
                    (imgSort(imgObj) ? (
                      <div className="big-img-container">
                        <img
                          className="big-img"
                          src={imgObj.url}
                          onError={(e) => {
                            e.target.src =
                              "https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0";
                          }}
                        />
                      </div>
                    ) : (
                      <div className="small-img-container">
                        <img
                          className="small-img"
                          src={imgObj.url}
                          onError={(e) => {
                            e.target.src =
                              "https://play-lh.googleusercontent.com/1zfN_BL13q20v0wvBzMWiZ_sL_t4KcCJBeAMRpOZeT3p34quM-4-pO-VcLj8PJNXPA0";
                          }}
                        />
                      </div>
                    ))}
                </div>
              ))} */}
          {/* </div> */}
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
                <div></div>
                <div style={{ fontWeight: "bold" }}>
                  ${spotDetails.price.toFixed(2)} night
                  <div className="star-container">
                    <div>&#9733;</div>
                    {spotDetails.avgRating && spotDetails.avgRating.toFixed(1)}
                    <div>{spotDetails.numReviews} reviews</div>
                  </div>
                </div>
              </div>
              <button onClick={() => window.alert("Feature Coming Soon...")}>
                Reserve
              </button>
            </div>
          </div>

          <div className="review-main-container">
            {/* <div className="inLine-review">
              <div className="avg-review-container">
                {spotDetails.avgRating &&
                spotDetails.avgRating &&
                spotDetails.numReviews > 0 ? (
                  <>
                    <div>&#9733;{spotDetails.avgRating.toFixed(1)}</div>
                    <div>&middot;</div>

                    {spotDetails.numReviews && spotDetails.numReviews === 1 ? (
                      <div>{spotDetails.numReviews} Review</div>
                    ) : (
                      <div>{spotDetails.numReviews} Reviews</div>
                    )}
                  </>
                ) : (
                  <div>&#9733;New</div>
                )}
              </div>
              {}
            </div> */}
            <SpotReviews  ownerId={spotDetails.ownerId} avgRating={spotDetails.avgRating} numReviews={spotDetails.numReviews}/>
          </div>
        </>
      )}
    </div>
  );
};
