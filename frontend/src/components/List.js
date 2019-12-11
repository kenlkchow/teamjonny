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

import pubImage from '../images/locationicons/pub-colour.png'
import coffeeImage from '../images/locationicons/coffee-colour.png'
import restaurantImage from '../images/locationicons/restaurant-colour.png'
import brunchImage from '../images/locationicons/brunch-colour.png'
import shopImage from '../images/locationicons/shop-colour.png'
import otherImage from '../images/locationicons/other-colour.png'

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

  const [randomKey, setRandomKey] = useState(0.5)

  function randomizeKey() {
    setRandomKey(Math.random())
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  function handlePrivacy(e) {
    setPrivacy(e.target.value)
  }

  function removeLocation(e) {
    axios.delete(`/api/locations/${e.target.id}`, {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(() => getData())
      .catch(err => console.log(err))

    randomizeKey()
  }

  function getData() {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setLocations(resp.data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {

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

    getData()
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
        key={randomKey}
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
                    <img className="accordion-category-image" src={(location.category === 'Pub') ? pubImage :
                      (location.category === 'Restaurant') ? restaurantImage :
                        (location.category === 'Coffee Shop') ? coffeeImage :
                          (location.category === 'Bistro/Brunch') ? brunchImage :
                            (location.category === 'Shop') ? shopImage :
                              (location.category === 'Other') ? otherImage : null} />
                  </ AccordionItemButton>
                </ AccordionItemHeading>
                <AccordionItemPanel >
                  <div className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <a className="is-size-9" href={`https://www.google.com/maps/place/${location.postcode}`} target='_blank' rel='noopener noreferrer'>Google Maps</a>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>
                      <strong>{location.priciness}</strong>
                    </p>
                    <p>
                      {location.category}
                    </p>
                  </div>
                  <div className="container">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <p>
                            <Link to={location.website} >
                              {location.website}
                            </Link >
                          </p>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          created by: {location.user.username} ({location.privacy})
                        </div>
                      </div>
                    </div>
                  </div>
                  {(Auth.getUserId() === location.user.id) && <div className="container">
                    <div className="level is-mobile">
                      {(Auth.getUserId() === location.user.id) && <Link className="button is-link is-small" id="list-Edit-Button" to={`/edit/${location._id}`}>Edit</Link>}
                      {(Auth.getUserId() === location.user.id) && <button className="button is-danger is-small" id={location._id} onClick={removeLocation}>Delete</button>}
                    </div>
                  </div>}
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


  // < div className = "level is-mobile" >
  //   <div className="level-left">
  //     <div className="level-item">
  //       <b>{location.name}</b> - {location.postcode}
  //     </div>
  //   </div>
  //   <div className="level-right">
  //     <div className="level-item">
  //       <figure className="image is-32x32">
  //         <img src={(location.category === 'Pub') ? pubImage :
  //           (location.category === 'Restaurant') ? restaurantImage :
  //             (location.category === 'Coffee Shop') ? coffeeImage :
  //               (location.category === 'Bistro/Brunch') ? brunchImage :
  //                 (location.category === 'Shop') ? shopImage :
  //                   (location.category === 'Other') ? otherImage : ''} />
  //       </figure>
  //     </div>
  //   </div>
  //   </div >