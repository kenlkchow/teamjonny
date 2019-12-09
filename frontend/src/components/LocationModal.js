import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LocationModal = ({ locationId, toggleModal }) => {

  const [priciness, setPriciness] = useState('')
  const [singleLocation, setSingleLocation] = useState({})

  useEffect(() => {
    axios.get(`/api/locations/${locationId}`, {
      headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGVhNzRkODgzOGQ4N2MxZmU0ZDcwMmMiLCJpYXQiOjE1NzU4ODU0MjUsImV4cCI6MTU3NTk3MTgyNX0.5T7VEMCotsI0H7Rw6yl_Pr9T9BwxMrt6OOAmwLyxxcU' }
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
        <p>{singleLocation.notes}</p>
        {singleLocation.openLate ? <p>Open late</p> : null}
        <p>{priciness}</p>
      </section>
      <footer className="modal-card-foot">
        <Link className="button is-success">Edit</Link>
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export { LocationModal }