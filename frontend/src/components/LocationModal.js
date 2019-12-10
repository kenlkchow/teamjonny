import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/authMethods'
import moment from 'moment'

const LocationModal = ({ locationId, toggleModal }) => {

  const [priciness, setPriciness] = useState('')
  const [singleLocation, setSingleLocation] = useState({ user: { username: '' }
  })

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
        <p>{priciness}</p>
        <p className="modal-card-subtitle">Notes: <br></br>{singleLocation.notes}</p>
      </section>
      <footer className="modal-card-foot">
        <Link className="button is-success" to={`/edit/${locationId}`}>Edit</Link>
        <p>Location added by <strong>{singleLocation.user.username}</strong> {moment(singleLocation.updatedAt).fromNow()}</p>
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export { LocationModal }