import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Auth from '../lib/authMethods'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'


const List = () => {

  const [category, setCategory] = useState('All')
  const [privacy, setPrivacy] = useState('1')
  const [userCircle, setUserCircle] = useState([])

  const [locations, setLocations] = useState([{
    category: '',
    createdAt: '',
    name: '',
    notes: '',
    openLate: false,
    postcode: '',
    priciness: '',
    privacy: '',
    updatedAt: '',
    user: {
      username: '',
      id: ''
    },
    website: ''
  }])

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  function handlePrivacy(e) {
    setPrivacy(e.target.value)
  }

  useEffect(() => {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setLocations(resp.data)
      })
      .catch(err => console.log(err))

    axios.get('/api/circle', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        const userData = resp.data.approved.map(data => {
          return data.id
        })
        setUserCircle(userData)
      })
      .catch(err => console.log(err))
  }, [])

  locations.forEach(location => {
    if (location.priciness === 1) return location.priciness = '£'
    if (location.priciness === 2) return location.priciness = '££'
    if (location.priciness === 3) return location.priciness = '£££'
  })

  locations.forEach(location => {
    if (location.privacy === 1) return location.privacy = 'public'
    if (location.privacy === 2) return location.privacy = 'circle'
    if (location.privacy === 3) return location.privacy = 'private'
  })

  return <section className="section">
    <div className='container'>
      <div className="level is-mobile">
        <div className="level-right">
          <div className="level-item">
            <div className="select is-small">
              <select name="category" onChange={handleCategory}>
                <option value="Select" hidden defaultValue>Select</option>
                <option value="All">All</option>
                <option value="Bistro/Brunch">Bistro/Brunch</option>
                <option value="Coffee Shop">Coffee Shop</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Shop">Shop</option>
                <option value="Pub">Pub</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="level-item">
            <div className="select is-small">
              <select name="category" onChange={handlePrivacy}>
                <option value="Select" hidden defaultValue>Select</option>
                <option value="1">All locations</option>
                <option value="2">Circles locations</option>
                <option value="3">Your locations only</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}

      >
        {locations
          .filter(location => {
            if (category === 'All') return locations
            else return location.category === category
          })
          .filter(location => {
            if (privacy == 3) return Auth.getUserId() === location.user.id
            else if (privacy == 2) return (Auth.getUserId() === location.user.id) || ((location.privacy == 2 || location.privacy == 1) && userCircle.includes(location.user.id))
            else if (privacy == 1) return locations
          })
          .map((location, i) => {
            return (
              <AccordionItem key={i}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <b>{location.name}</b> - {location.postcode}
                  </ AccordionItemButton>
                </ AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    category: {location.category}
                  </p>
                  <p>
                    website: {location.website}
                  </p>
                  <p>
                    priciness: {location.priciness}
                  </p>
                  <p>privacy: {location.privacy}  </p>
                  <p>
                    Created by: {location.user.username}
                  </p>
                  <Link className="button is-success" id="list-Edit-Button" to={`/edit/${location._id}`}>Edit</Link>
                </AccordionItemPanel>
              </ AccordionItem>
            )
          })}
      </Accordion>
    </div>
    {console.log(locations)}
  </section>

}

export default List   