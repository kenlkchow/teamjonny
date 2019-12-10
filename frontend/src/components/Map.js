import React, { useState, useEffect } from 'react'
import ReactMap, { Marker } from 'react-map-gl'
import axios from 'axios'
import { LocationModal } from './LocationModal'
import Auth from '../lib/authMethods'

import pubImage from '../images/locationicons/pub.png'
import coffeeImage from '../images/locationicons/coffee.png'
import restaurantImage from '../images/locationicons/restaurant.png'
import brunchImage from '../images/locationicons/brunch.png'
import shopImage from '../images/locationicons/shop.png'
import otherImage from '../images/locationicons/other.png'


<<<<<<< HEAD
const Map = (props) => {
    
  const [viewport, setViewPort ] = useState({
=======
const Map = () => {

  const [viewport, setViewPort] = useState({
>>>>>>> development
    width: '50vw',
    height: '50vh',
    latitude: 51.51491,
    longitude: -0.07280,
    zoom: 16
  })

  const [locations, setLocations] = useState([{
    category: '',
    createdAt: '',
    latitude: 0,
    longitude: 0,
    name: '',
    notes: '',
    openLate: false,
    postcode: '',
    priciness: 0,
    privacy: 0,
    updatedAt: '',
    user: {
      username: '',
      id: ''
    },
    website: ''
  }])

  const [categoryFilter, setCategoryFilter] = useState('All')
  const [privacyFilter, setPrivacyFilter] = useState('1')
  const [modal, setModal] = useState(false)
  const [locationId, setLocationId] = useState('')
  const [userCircle, setUserCircle] = useState([])

  function getData() {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        const availableData = resp.data
        const pulledPostcodes = availableData.map(postcode => {
          return postcode.postcode
        })

        axios.post('https://api.postcodes.io/postcodes', {
          'postcodes': pulledPostcodes
        })
          .then(resp => {
            availableData.forEach((postcode, i) => {
              if (resp.data.result[i].result === null) {
                resp.data.result[i].result = {}
                resp.data.result[i].result.latitude = 'remove me'
                resp.data.result[i].result.longitude = 'remove me'
              }
              postcode.latitude = resp.data.result[i].result.latitude
              postcode.longitude = resp.data.result[i].result.longitude
            })
            const addedLongLat = availableData
            const filteredLongLat = addedLongLat.filter(element => {
              return element.latitude !== 'remove me'
            })
            setLocations(filteredLongLat)
          })
      })
  }
  function toggleModal() {
    setModal(!modal)
  }
  function handleClick(e) {
    setLocationId(e.target.id)
    toggleModal()
  }
  function handleCategory(e) {
    setCategoryFilter(e.target.value)
  }
  function handlePrivacy(e) {
    setPrivacyFilter(e.target.value)
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

  const _onViewportChange = viewport => setViewPort({ ...viewport })

  return <section className="section hero is-fullheight has-background-link">
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column">
          <div id="mapbox">
            <ReactMap
              mapboxApiAccessToken="pk.eyJ1IjoiamdhciIsImEiOiJjazNicmRob2MwOTM0M2R1aW9iMjJpdHBxIn0.b-gHKxL-hNP7YOODnakv7Q"
              {...viewport}
              onViewportChange={_onViewportChange}
            >
              {locations
                .filter(location => {
                  if (categoryFilter === 'All') {
                    return locations
                  } else if (location.category === categoryFilter) {
                    return locations
                  }
                })
                .filter(location => {
                  if (privacyFilter == 3 && Auth.getUserId() === location.user.id) {
                    return locations
                  } else if (privacyFilter == 2) {
                    if (Auth.getUserId() === location.user.id || ((location.privacy == 2 || location.privacy == 1) && userCircle.includes(location.user.id))) {
                      return locations
                    }
                  } else if (privacyFilter == 1) {
                    return locations
                  }
                })
                .map((location, i) => {
                  return <Marker
                    key={i}
                    latitude={location.latitude}
                    longitude={location.longitude}
                    offsetTop={-30}
                    offsetLeft={-20}>
                    <div
                      className="marker"
                      id={location._id}
                      user={location.user.id}
                      onClick={handleClick}
                      style={(location.category === 'Pub') ? { backgroundImage: `url(${pubImage})` } :
                        (location.category === 'Restaurant') ? { backgroundImage: `url(${restaurantImage})` } :
                          (location.category === 'Coffee Shop') ? { backgroundImage: `url(${coffeeImage})` } :
                            (location.category === 'Bistro/Brunch') ? { backgroundImage: `url(${brunchImage})` } :
                              (location.category === 'Shop') ? { backgroundImage: `url(${shopImage})` } :
                                (location.category === 'Other') ? { backgroundImage: `url(${otherImage})` } : {}}></div>
                  </Marker>
                })}
            </ReactMap>
          </div>
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <div className="select">
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
          </div>
          <div className="column">
            <div className="select">
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
    </div>
    {modal ? <LocationModal 
      setModal={setModal}
      getData={getData}
      toggleModal={toggleModal}
      props={props}
      locationId={locationId}/> : null}
  </section>
}

export default Map
