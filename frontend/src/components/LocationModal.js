import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/authMethods'
import moment from 'moment'

import pubImage from '../images/locationicons/pub-colour.png'
import coffeeImage from '../images/locationicons/coffee-colour.png'
import restaurantImage from '../images/locationicons/restaurant-colour.png'
import brunchImage from '../images/locationicons/brunch-colour.png'
import shopImage from '../images/locationicons/shop-colour.png'
import otherImage from '../images/locationicons/other-colour.png'

const LocationModal = ({ locationId, toggleModal, props, getData, setModal }) => {

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setModal(false)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])

  const [priciness, setPriciness] = useState('')
  const [singleLocation, setSingleLocation] = useState({ user: { username: '' }
  })

  function removeLocation() {
    axios.delete(`/api/locations/${locationId}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(() => {
        getData()
        props.history.push('/map', { from: 'delete' })
        setModal(false)
      })

      .catch(err => console.log(err))
  }

  function isOwner() {
    return Auth.getUserId() === singleLocation.user.id
  }

  useEffect(() => {
    axios.get(`/api/locations/${locationId}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        if (resp.data.priciness === 1) {
          setPriciness('£')
        } else if (resp.data.priciness === 2) {
          setPriciness('££')
        } else if (resp.data.priciness === 3) {
          setPriciness('£££')
        }
        setSingleLocation(resp.data)
      })
  }, [])  


  return  <div className="modal is-active">
    <div className="modal-background" onClick={toggleModal}></div>
    <div className="modal-card">
      <header className="modal-card-head has-text-left">
        <p className="modal-card-title title">{singleLocation.name} <br /> 
          <p className="modal-subtitle is-size-6">{singleLocation.category}</p>
        </p>
        <figure className="image is-64x64">
          <img src={(singleLocation.category === 'Pub') ? pubImage : 
            (singleLocation.category === 'Restaurant') ? restaurantImage :
              (singleLocation.category === 'Coffee Shop') ? coffeeImage :
                (singleLocation.category === 'Bistro/Brunch') ? brunchImage : 
                  (singleLocation.category === 'Shop') ? shopImage :
                    (singleLocation.category === 'Other') ? otherImage : ''} />
        </figure>
        
      </header>
      <section className="modal-card-body">
        {priciness ? <div className="location-info"><strong>{priciness}</strong></div> : <></>}

        <div className="location-info"><a href={singleLocation.website} target='_blank' rel='noopener noreferrer'>{singleLocation.website}</a></div>
        <div className="location-info">{singleLocation.postcode} <a className="is-size-7" href={`https://www.google.com/maps/place/${singleLocation.postcode}`} target='_blank' rel='noopener noreferrer'>(Google Maps)</a></div>
        {singleLocation.openLate ? <div>Open late</div> : <></>}

        <div className="location-info">Notes: <br></br>{singleLocation.notes}</div>

      </section>
      <footer className="modal-card-foot">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              {isOwner() && <Link className="button is-link is-small" to={`/edit/${locationId}`}>Edit</Link>}
            </div>
            <div className="level-item">
              <div className="is-size-7">Location added by <strong>{singleLocation.user.username}</strong> ({moment(singleLocation.updatedAt).fromNow()})</div>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {isOwner() && <button className="button is-danger is-small" onClick={removeLocation}>Delete</button>}
            </div>
          </div>
        </div>
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export { LocationModal }