import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetReviews } from "../../store/reviews";
import { dateFormater } from "./SpotReviewFuncs";
import { useParams } from "react-router-dom";

export const SpotReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const spotReview = useSelector((state) => state.reviews);
  //   console.log("this is spotReview", spotReview);

  useEffect(() => {
    dispatch(thunkGetReviews(id));
  }, [dispatch, id]);

  return (
    <>
      {!spotReview.reviews ? (
        <div>Be the first to post a Review!</div>
      ) : (
        <>
          <div className="reviews-main-container">
            <div className="indie-review-container">
              {spotReview.reviews &&
                spotReview.reviews.map((review) => (
                  <>
                    <div className="first-name">{review.User.firstName} </div>
                    <div style={{ color: "gray" }}>{dateFormater(review)}</div>
                    <div>{review.review}</div>
                  </>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
