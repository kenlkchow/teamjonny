import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/authMethods'
import moment from 'moment'

const LocationModal = ({ locationId, toggleModal, props }) => {

  const [priciness, setPriciness] = useState('')
  const [singleLocation, setSingleLocation] = useState({ user: { username: '' }
  })

  function removeLocation() {
    axios.delete(`/api/locations/${locationId}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(props.history.push('/map'))
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
      <header className="modal-card-head">
        <p className="modal-card-title">{singleLocation.name}</p>
      </header>
      <section className="modal-card-body">
        <p>{singleLocation.category}</p>
        {singleLocation.openLate ? <p>Open late</p> : null}
        <p><strong>{priciness}</strong></p>
        <p className="modal-card-subtitle">Notes: <br></br>{singleLocation.notes}</p>
      </section>
      <footer className="modal-card-foot">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              {isOwner() && <Link className="button is-success" to={`/edit/${locationId}`}>Edit</Link>}
            </div>
            <div className="level-item">
              <p>Location added by <strong>{singleLocation.user.username}</strong> {moment(singleLocation.updatedAt).fromNow()}</p>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              {isOwner() && <button className="button is-danger" onClick={removeLocation}>Delete</button>}
            </div>
          </div>
        </div>
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export { LocationModal }