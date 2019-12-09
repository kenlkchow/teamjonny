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
  openLate: '',
  privacy: '',
  notes: ''
}


const NewLocation = (props) => {
  const [data, updateData] = useState(initialData)
  const [errors, setErrors] = useState(initialData)

  function handleChange(e) {
    const newErrors = { ...errors, [e.target.name]: '' }
    setErrors(newErrors)
    
    const numeric = ['priciness', 'privacy']
    if (numeric.includes(e.target.name)) {
      updateData({ ...data, [e.target.name]: parseInt(e.target.value) })
    } else {
      updateData({ ...data, [e.target.name]: e.target.value })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/locations', data, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => props.history.push('/map'))
      .catch(err => setErrors({ ...errors, ...err.response.data.errors }))
  }

  return <section className="section">
    {console.log(data)}
    {console.log(errors)}
    <div className="container">
      <div className="title">Add new location</div>
      <LocationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        data={data} 
      />
    </div>
  </section>
}

export default NewLocation