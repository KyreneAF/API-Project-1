import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetDetailsSpot } from "../../store/spots";
import { SpotReviews } from "../SpotReviews/SpotReviews";
import "./SpotDetails.css";

export const SpotDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const spotDetails = useSelector((state) => state.spots.spot);

  useEffect(() => {
    dispatch(thunkGetDetailsSpot(id));
  }, [dispatch, id]);

  const imgSort = (imgObj) => {
    if (imgObj.preview === true) {
      return true;
    } else return false;
  };

  return (
    <div className="spot-main-container">
      {spotDetails && (
        <>
          <div className="spot-info">
            <h2>{spotDetails.name}</h2>
            <div>
              {spotDetails.city}, {spotDetails.state}, {spotDetails.country}
            </div>
          </div>

          <div className="spot-img-container">
            {spotDetails.SpotImages &&
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
              ))}
          </div>
          <div
            className="text-main-container"
            style={{ borderBottom: "2px solid black" }}
          >
            <div className="host-name-container" style={{ fontWeight: "bold" }}>
              <div>
                Hosted By {spotDetails.Owner.firstName}{" "}
                {spotDetails.Owner.lastName}
              </div>
            </div>
            <div className="desc-container">
              <div>{spotDetails.description}</div>
            </div>

            <div className="reserve-main-container">
              <div style={{ fontWeight: "bold" }}>
                ${spotDetails.price.toFixed(2)} night
              </div>
              <div>&#9733;</div>
              <div>
                {spotDetails.avgRating && spotDetails.avgRating.toFixed(1)}
              </div>
              <div>{spotDetails.numReviews} reviews</div>
              <button onClick={() => window.alert("Feature Coming Soon...")}>
                Reserve
              </button>
            </div>
          </div>

          <div className="review-main-container">
            <div className="inLine-review">
              <div className="avg-review-container">
                {spotDetails.avgRating && spotDetails.avgRating ? (
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
            </div>
            <SpotReviews />
          </div>
        </>
      )}
    </div>
  );
};
