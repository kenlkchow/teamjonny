import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const LocationForm = ({ data, errors, handleSubmit, handleChange }) => (
  <div className="container">
    <form className="form" onSubmit={handleSubmit}>

      <div className="field">
        <label className="label">
          Name
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
          Postcode
        </label>
        <div className="control">
          <input
            onChange={handleChange}
            type="text"
            name="postcode"
            className="input"
            placeholder="E1 0AA"
            value={data.postcode}
          />
        </div>
      </div>
      {errors.postcode && <small className="help is-danger">{errors.postcode}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Category
        </label>
        <div className="control">
          <div className="select">
            <select name="category" onChange={handleChange}>
              <option value="Select" hidden defaultValue>Select</option>
              <option value="Bistro/Brunch">Bistro/Brunch</option>
              <option value="Coffee Shop">Coffee Shop</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Shop">Shop</option>
              <option value="Other">Other</option>
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
            <input type="radio" value="1" name="priciness" className="radio-button" />
            <p>£</p>
          </label>
          <label className="radio">
            <input type="radio" value="2" name="priciness" className="radio-button" />
            <p>££</p>
          </label>
          <label className="radio">
            <input type="radio" value="3" name="priciness" className="radio-button" />
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
            <input type="radio" name="openLate" value="true" className="radio-button" />
            <p>Yes</p>
          </label>
          <label className="radio">
            <input type="radio" name="openLate" value="false" className="radio-button" />
            <p>No</p>
          </label>
        </div>
      </div>
      {errors.openLate && <small className="help is-danger">{errors.openLate}</small>}

      <div className="field">
        <label htmlFor="" className="label">
          Visible for
        </label>
        <div className="control all-radio-buttons" onChange={handleChange}>
          <label className="radio">
            <input type="radio" value="3" name="privacy" className="radio-button" />
            <p>Only me</p>
          </label>
          <label className="radio">
            <input type="radio" value="2" name="privacy" className="radio-button" />
            <p>Circle</p>
          </label>
          <label className="radio">
            <input type="radio" value="1" name="privacy" className="radio-button" />
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

      <button className="button is-link">
      Submit
      </button>
      {errors.message && <small className="help is-danger">
        {errors.message}
      </small>}
      
    </form>
  </div>
)

export default LocationForm