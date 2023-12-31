import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateSpot.css";
import { thunkCreateSpot } from "../../store/spots";




export const CreateSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [validations, setValidations] = useState({});
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");



  const onSubmit = async (e) => {
    e.preventDefault();
    const errObj = {}

    if (!address) errObj.address = "Address is required";
    if (!city) errObj.city = "City is required";
    if (!state) errObj.state = "State is required";
    if (!country) errObj.country = "Country is required";
    if (!description || description.length < 30)errObj.description = "Description needs 30 or more characters";
    if (!previewImg) errObj.previewImg = "Preview Image is required";
    if(isNaN(Number(price))) errObj.price = 'Must be valid price';
    if (!price) errObj.price = "Price per night is required";
    if (!name) errObj.name = "Title for Spot is required";

    setValidations(errObj)

    if (!Object.values(errObj).length) {
      const newPreviewImage = {
        url: previewImg,
        preview: true,
      };
      let Images = [newPreviewImage];

      if (image1) {
        Images.push({ url: image1, preview: false });
      }
      if (image2) {
        Images.push({ url: image2, preview: false });
      }
      if (image3) {
        Images.push({ url: image3, preview: false });
      }
      if (image4) {
        Images.push({ url: image4, preview: false });
      }

      let newSpot = {

          address,
          city,
          state,
          country,
          lat: lat || 0,
          lng: lng || 0,
          name,
          price,
          description,

      };



    const createdSpot = await dispatch(thunkCreateSpot(newSpot,Images));




      navigate(`/spots/${createdSpot.id}`);
    }
  };

  return (
    <>
      <div className="form-main-container">
        <div className="form-container">
          <form className="spot-form" onSubmit={onSubmit}>
            <div className="sec">
              <h2>Create a new Spot</h2>
              <h3>Where&apos;s your place located?</h3>
              <div>
                Guests will only get your exact address once they book a
                reservation.
              </div>

              <label>
                Country
                <input
                  type="text"
                  name="Country"
                  maxLength={20}
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}

                />
              </label>
              {validations.country && (
                <div className="error-text">{validations.country}</div>
              )}


              <label>
               Street Address
                <input
                  type="text"
                  name="Address"
                  maxLength={100}
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              {validations.address && (
                <div className="error-text">{validations.address}</div>
              )}

              <div className="side-by-side">
                <label>
                  City
                  <input
                    type="text"
                    name="City"
                    maxLength={20}
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
                {validations.city && (
                  <div className="error-text">{validations.city}</div>
                )}


                <div className="comma"> , </div>
                <label>
                  State
                  <input
                    type="text"
                    name="State"
                    maxLength={20}
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
                {validations.state && (
                  <div className="error-text">{validations.state}</div>
                )}


              </div>
              <div className="side-by-side-2">
                <label>
                  Latitude
                  <input
                    type="number"
                    name="lat"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                  />
                </label>
                <div className="comma"> , </div>
                <label>
                  Longitude
                  <input
                    type="number"
                    name="lng"
                    placeholder="Longitude"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}

                  />
                </label>
              </div>
            </div>
            <div className="sec">
              <h3>Describe your place to guests</h3>
              <div>
                Mention the best features of your space, any special amenities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </div>
              <label>
                <textarea
                  type="textArea"
                  rows='15'
                  name="description"
                  maxLength={255}
                  placeholder="Please write at least 30 characters"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}

                />
              </label>
              {validations.description && (
                <div className="error-text">{validations.description}</div>
              )}


            </div>
            <div className="sec">
              <h3>Create a title for your spot</h3>
              <div>
                Catch guests&apos; attention with a spot title that highlights
                what makes your place special.
              </div>
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name of your spot"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {validations.name && (
                <div className="error-text">{validations.name}</div>
              )}


            </div>
            <div className="sec">
              <h3>Set a base price for your spot</h3>
              <div>
                Competitive pricing can help your listing stand out and rank
                higher in search results.
              </div>
              <div className="side-by-side">
                <div> $ </div>
                <label>
                  <input
                    type="number"
                    name="price"
                    // maxLength='10'
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </label>
                {validations.price && (
                  <div className="error-text">{validations.price}</div>
                )}
              </div>
            </div>
            <div className="sec">
              <h3>Liven up your spot with photos</h3>
              <div>
                Submit a link to at least one photo to publish your spot.
              </div>
              <label>

                <input
                  type="text"
                  name="preview url"
                  maxLength='255'
                  placeholder="Preview Image URL"
                  value={previewImg}
                  onChange={(e) => setPreviewImg(e.target.value)}
                />
              </label>
              {validations.previewImg && (
                <div className="error-text">{validations.previewImg}</div>
              )}
            {previewImg.length === 255 && <span className='error-text'>Character limit reached</span>}
              <label>
                <input
                  type="text"
                  name="photo url"
                  maxLength='255'
                  placeholder="Image URL"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                />
              </label>
              {image1.length === 255 && <span className='error-text'>Character limit reached</span>}
              <label>
                <input
                  type="text"
                  name="photo url"
                  maxLength='255'
                  placeholder="Image URL"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                />
              </label>
              {image2.length === 255 && <span className='error-text'>Character limit reached</span>}
              <label>
                <input
                  type="text"
                  name="photo url"
                  maxLength='255'
                  placeholder="Image URL"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                />
              </label>
              {image3.length === 255 && <span className='error-text'>Character limit reached</span>}
              <label>
                <input
                  type="text"
                  name="photo url"
                  maxLength='255'
                  placeholder="Image URL"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                />
              </label>
              {image4.length === 255 && <span className='error-text'>Character limit reached</span>}
            </div>
            <div className="button-container">
              <button
              // type="submit"
              // disabled={Object.values(validations).length > 0}
              >
                Create Spot
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
