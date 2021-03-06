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


const NewLocation = (props) => {
  const [data, updateData] = useState(initialData)
  const [errors, setErrors] = useState(initialData)
  const [postcodeValidation, setPostcodeValidation] = useState('')

  function handleChange(e) {
    const newErrors = { ...errors, [e.target.name]: '' }
    setErrors(newErrors)
    
    const numeric = ['priciness', 'privacy']
    if (numeric.includes(e.target.name)) {
      updateData({ ...data, [e.target.name]: parseInt(e.target.value) })
      
    } else if (e.target.name === 'postcode') {
      setPostcodeValidation('')
      updateData({ ...data, [e.target.name]: e.target.value.toUpperCase() })
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
    axios.post('/api/locations', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then((resp) => props.history.push('/map', { ...resp.data, from: 'new' }))
      .catch(err => setErrors({ ...errors, ...err.response.data.errors }))
  }

  useEffect(() => {
    if (props.location.state === undefined) {
      return
    } else {
      updateData({ ...initialData, postcode: props.location.state })
      setPostcodeValidation(200)
    }
  }, [])

  return <section className="section">
    <div className="container">
      <div className="title">Add new location</div>
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

export default NewLocation