import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LocationForm = ({ data, errors, handleSubmit, handleChange, handlePostcode, postcodeValidation }) => (
  <div className="container">
    <form className="form form-location" onSubmit={handleSubmit}>

      <div className="field">
        <label className="label">
          Name (required)
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="name"
            className="input"
            placeholder="Name"
            value={data.name}
          />
        </div>
      </div>
      {errors.name && <small className="help is-danger">{errors.name}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Postcode (required)
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            onBlur={handlePostcode}
            type="text"
            name="postcode"
            className={`input ${(postcodeValidation === 200) ? 'is-success' : (postcodeValidation === 404) ? 'is-danger' : ''}`}
            placeholder="E1 0AA"
            value={data.postcode}
          />
        </div>
      </div>
      {errors.postcode && <small className="help is-danger">{errors.postcode}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Category (required)
        </label>
        <div className="control">
          <div className="select">
            <select name="category" onChange={handleChange}>
              <option value="Select" hidden defaultValue>Select</option>
              <option value="Bistro/Brunch" selected={(data.category === 'Bistro/Brunch') ? 'selected' : ''}>Bistro/Brunch</option>
              <option value="Coffee Shop" selected={(data.category === 'Coffee Shop') ? 'selected' : ''}>Coffee Shop</option>
              <option value="Coffee Shop" selected={(data.category === 'Pub') ? 'selected' : ''}>Pub</option>
              <option value="Restaurant" selected={(data.category === 'Restaurant') ? 'selected' : ''}>Restaurant</option>
              <option value="Shop" selected={(data.category === 'Shop') ? 'selected' : ''}>Shop</option>
              <option value="Other" selected={(data.category === 'Other') ? 'selected' : ''}>Other</option>
            </select>
          </div>
        </div>
      </div>
      {errors.category && <small className="help is-danger">{errors.category}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Website
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="website"
            className="input"
            placeholder="www.thisgreatplace.com"
            value={data.website}
          />
        </div>
      </div>
      {errors.website && <small className="help is-danger">{errors.website}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Priciness
        </label>
        <div className="control all-radio-buttons" onChange={handleChange}>
          <label className="radio">
            <input type="radio" value="1" name="priciness" className="radio-button" checked={(data.priciness === 1) ? 'checked' : ''} />
            <p>£</p>
          </label>
          <label className="radio">
            <input type="radio" value="2" name="priciness" className="radio-button" checked={(data.priciness === 2) ? 'checked' : ''} />
            <p>££</p>
          </label>
          <label className="radio">
            <input type="radio" value="3" name="priciness" className="radio-button" checked={(data.priciness === 3) ? 'checked' : ''} />
            <p>£££</p>
          </label>
        </div>
      </div>
      {errors.priciness && <small className="help is-danger">{errors.priciness}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Open late?
        </label>
        <div className="control all-radio-buttons" onChange={handleChange}>
          <label className="radio">
            <input type="radio" name="openLate" value="true" className="radio-button" checked={(data.openLate) ? 'checked' : ''} />
            <p>Yes</p>
          </label>
          <label className="radio">
            <input type="radio" name="openLate" value="false" className="radio-button" checked={(!data.openLate && data.openLate !== undefined) ? 'checked' : ''} />
            <p>No</p>
          </label>
        </div>
      </div>
      {errors.openLate && <small className="help is-danger">{errors.openLate}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Visible for (required)
        </label>
        <div className="control all-radio-buttons" onChange={handleChange}>
          <label className="radio">
            <input type="radio" value="3" name="privacy" className="radio-button" checked={(data.privacy === 3) ? 'checked' : ''}  />
            <p>Only me</p>
          </label>
          <label className="radio">
            <input type="radio" value="2" name="privacy" className="radio-button" checked={(data.privacy === 2) ? 'checked' : ''} />
            <p>Circle</p>
          </label>
          <label className="radio">
            <input type="radio" value="1" name="privacy" className="radio-button" checked={(data.privacy === 1) ? 'checked' : ''} />
            <p>Public</p>
          </label>
        </div>
      </div>
      {errors.privacy && <small className="help is-danger">{errors.privacy}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Notes
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="notes"
            className="input"
            placeholder="Any other comments"
            value={data.notes}
          />
        </div>
      </div>
      {errors.notes && <small className="help is-danger">{errors.notes}</small>}

      <button className='button is-link' disabled={(data.name && data.category && data.privacy && postcodeValidation === 200) ? '' : 'disabled'}>
      Submit
      </button>
      {errors.message && <small className="help is-danger">
        {errors.message}
      </small>}
      
    </form>
  </div>
)

export default LocationForm