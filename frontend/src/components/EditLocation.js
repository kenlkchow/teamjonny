import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/authMethods'
import LocationForm from './LocationForm'

const initialData = {
  name: '',
  postcode: '',
  category: '', 
  website: '',
  priciness: '',
  openLate: undefined,
  privacy: '',
  notes: ''
}


const EditLocation = (props) => {
  const [data, updateData] = useState(initialData)
  const [errors, setErrors] = useState(initialData)
  const [postcodeValidation, setPostcodeValidation] = useState(200)

  useEffect(() => {
    const locationId = props.match.params.id
    axios.get(`/api/locations/${locationId}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => updateData(resp.data))
      .catch(err => setErrors({ ...errors, ...err.response.data.errors }))
  }, [])

  function handleChange(e) {
    const newErrors = { ...errors, [e.target.name]: '' }
    setErrors(newErrors)
    
    const numeric = ['priciness', 'privacy']
    if (numeric.includes(e.target.name)) {
      updateData({ ...data, [e.target.name]: parseInt(e.target.value) })
      
    } else if (e.target.name === 'postcode') {
      setPostcodeValidation('')
      updateData({ ...data, [e.target.name]: e.target.value })
    } else if (e.target.name === 'openLate') {
      let openLate
      (e.target.value === 'true') ?  openLate = true : openLate = false
      updateData({ ...data, openLate })
    } else {
      updateData({ ...data, [e.target.name]: e.target.value })
    }
  }

  function handlePostcode(e) {
    const postcode = e.target.value
    if (postcode) {
      axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
        .then(resp => setPostcodeValidation(resp.data.status))
        .catch(err => setPostcodeValidation(err.response.data.status))
    }
  }
 
  function handleSubmit(e) {
    e.preventDefault()
    if (data.openLate === undefined) {
      delete data.openLate
    }
    const locationId = props.match.params.id
    axios.put(`/api/locations/${locationId}`, data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => props.history.push('/map', { ...resp.data, from: 'edit' }))
      .catch(err => setErrors({ ...errors, ...err.response.data.errors }))
  }

  return <section className="section">
    {console.log(data)}
    <div className="container">
      <div className="title">Edit {data.name}</div>
      <LocationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handlePostcode={handlePostcode}
        postcodeValidation={postcodeValidation}
        errors={errors}
        data={data} 
      />
    </div>
  </section>
}

export default EditLocation