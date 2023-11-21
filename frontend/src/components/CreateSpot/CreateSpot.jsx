import { useNavigate } from "react-router-dom"
import {useEffect,useState} from 'react'
import './CreateSpot.css'


export const CreateSpot = () => {


    const [country,setCountry] = useState('');
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [state,setState] = useState('');





    const onSubmit = (e) =>{
        e.preventDefault();

    }

    return (
        <>
          <div className='form-main-container'>
            <div className="form-container">
              <form className='spot-form'>
                <div className='sec' style={{ borderBottom: '2px solid black', padding:'20px' }}>
                  <h2>Create a new Spot</h2>
                  <h3>Where's your place located?</h3>
                  <div>Guests will only get your exact address once they book a reservation.</div>

                  <label>
                    Country
                    <input
                      type='text'
                      name='Country'
                      placeholder="Country"
                    />
                  </label>
                  <label>
                    Address
                    <input
                      type='text'
                      name='Address'
                      placeholder="Address"
                    />
                  </label>
                  <div className="side-by-side" >
                  <label>
                    City
                    <input
                      type='text'
                      name='City'
                      placeholder="City"
                    />
                  </label>
                  <div className="comma"> , </div>
                  <label>
                    State
                    <input
                      type='text'
                      name='State'
                      placeholder="State"
                    />
                  </label>
                  </div>
                </div>
                <div className="sec" style={{ borderBottom: '2px solid black' }}>
                  <h3>Describe your place to guests</h3>
                  <div>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</div>
                  <label>
                    <textarea
                      type='textArea'
                      name='description'
                      placeholder="Please write at least 30 characters"
                    />
                  </label>
                </div>
                <div className="sec" style={{ borderBottom: '2px solid black' }}>
                  <h3>Create a title for your spot</h3>
                  <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                  <label>
                    <input
                      type='text'
                      name='name'
                      placeholder="Name of your spot"
                    />
                  </label>
                </div>
                <div className='sec' style={{ borderBottom: '2px solid black' }}>
                  <h3>Set a base price for your spot</h3>
                  <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                  <div className='side-by-side' >
                    <div> $ </div>
                    <label>
                      <input
                        type='text'
                        name='price'
                        placeholder="Price per night (USD)"
                      />
                    </label>
                  </div>
                </div>
                <div className='sec' style={{ borderBottom: '2px solid black' }}>
                  <h3>Liven up your spot with photos</h3>
                  <div>Submit a link to at least one photo to publish your spot.</div>
                  <label>
                    <input
                      type='text'
                      name='preview url'
                      placeholder="Preview Image URL"
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
