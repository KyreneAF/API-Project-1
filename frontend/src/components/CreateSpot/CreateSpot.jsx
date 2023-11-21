import { useNavigate } from "react-router-dom"
import {useEffect,useState} from 'react'
import './CreateSpot.css'


export const CreateSpot = () => {

    const navigate = useNavigate()
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');
    const [country,setCountry] = useState('');
    const [lat,setLat] = useState(1.1);
    const [lng,setLng] = useState(1.1);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState(1);
    const [previewImg, setPreviewImg] = useState('')
    const [validations,setValidations] = useState({})



  useEffect(() =>{
    const errObj = {};

    if(!price || price <= 0) errObj.price = 'Price per night is required'
    if(description.length < 30) errObj.description = 'Description needs 30 or more characters'
    if(previewImg.length < 0 || !previewImg.endsWith('jpg') || !previewImg.endsWith('png'))  errObj.previewImg = 'Preview Image URL is required'

    setValidations(errObj)
  })




    const onSubmit = (e) =>{
        e.preventDefault();

    }

    return (
        <>
          <div className='form-main-container'>
            <div className="form-container">
              <form className='spot-form'>
                <div className='sec'>
                  <h2>Create a new Spot</h2>
                  <h3>Where's your place located?</h3>
                  <div>Guests will only get your exact address once they book a reservation.</div>

                  <label>
                    Country
                    <input
                      type='text'
                      name='Country'
                      placeholder="Country"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                  </label>
                  <label>
                    Address
                    <input
                      type='text'
                      name='Address'
                      placeholder="Address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </label>
                  <div className="side-by-side" >
                  <label>
                    City
                    <input
                      type='text'
                      name='City'
                      placeholder="City"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </label>
                  <div className="comma"> , </div>
                  <label>
                    State
                    <input
                      type='text'
                      name='State'
                      placeholder="State"
                      value={state}
                      onChange={e => setState(e.target.value)}
                    />
                  </label>
                  </div>
                  <div className="side-by-side-2" >
                  <label>
                    Latitude
                    <input
                      type='text'
                      name='lat'
                      placeholder="Latitude"
                      value={lat}
                      onChange={e => setLat(e.target.value)}
                    />
                  </label>
                  <div className="comma"> , </div>
                  <label>
                    Longitude
                    <input
                      type='text'
                      name='lng'
                      placeholder="Longitude"
                      value={lng}
                      onChange={e => setLng(e.target.value)}
                    />
                  </label>
                  </div>
                </div>
                <div className="sec">
                  <h3>Describe your place to guests</h3>
                  <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
                  <label>
                    <textarea
                      type='textArea'
                      name='description'
                      placeholder="Please write at least 30 characters"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </label>
                </div>
                <div className="sec">
                  <h3>Create a title for your spot</h3>
                  <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                  <label>
                    <input
                      type='text'
                      name='name'
                      placeholder="Name of your spot"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className='sec'>
                  <h3>Set a base price for your spot</h3>
                  <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                  <div className='side-by-side' >
                    <div> $ </div>
                    <label>
                      {"price" in validations && <p>{validations.price}</p>}
                      <input
                        type='text'
                        name='price'
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
                <div className='sec'>
                  <h3>Liven up your spot with photos</h3>
                  <div>Submit a link to at least one photo to publish your spot.</div>
                  <label>
                    {"previewImg" in validations && <p>{validations.previewImg}</p>}
                    <input
                      type='text'
                      name='preview url'
                      placeholder="Preview Image URL"
                      value={previewImg}
                      onChange={e => setPreviewImg(e.target.value)}
                    />
                  </label>
                  <label>
                    <input
                      type='text'
                      name='photo url'
                      placeholder="Image URL"
                    />
                  </label>
                  <label>
                    <input
                      type='text'
                      name='photo url'
                      placeholder="Image URL"
                    />
                  </label>
                  <label>
                    <input
                      type='text'
                      name='photo url'
                      placeholder="Image URL"
                    />
                  </label>
                  <label>
                    <input
                      type='text'
                      name='photo url'
                      placeholder="Image URL"
                    />
                  </label>
                </div>
                <div className='button-container'>
                  <button>Create Spot</button>
                </div>
              </form>
            </div>
          </div>
        </>
      );
    }
