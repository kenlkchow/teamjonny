import React, { useState, useEffect } from 'react'
import ReactMap, { Marker } from 'react-map-gl'
import axios from 'axios'
import { LocationModal } from './LocationModal'
import Auth from '../lib/authMethods'


const Map = () => {
    
  const [viewport, setViewPort ] = useState({
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

  const [filteredLocations, setFilteredLocations] = useState([{
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

  const [modal, setModal] = useState(false)
  const [locationId, setLocationId] = useState('')

  function toggleModal() {
    setModal(!modal)
  }

  function handleClick(e) {
    setLocationId(e.target.id)
    toggleModal()
  }

  function handleCategory(e) {
    // if (e.target.value === 'All') {
    //   return locations
    // } else {
    //   const categoryFiltered = locations
    // }
  }

  useEffect(() => {
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
  }, [])

  const _onViewportChange = viewport => setViewPort({ ...viewport })

  return <section className="section hero is-fullheight has-background-link">
    <div className="container has-text-centered">
      <div className="columns">
        <div className="column">
          <ReactMap
            mapboxApiAccessToken="pk.eyJ1IjoiamdhciIsImEiOiJjazNicmRob2MwOTM0M2R1aW9iMjJpdHBxIn0.b-gHKxL-hNP7YOODnakv7Q"
            { ...viewport }
            onViewportChange={_onViewportChange}
            // mapStyle="mapbox://styles/mapbox/outdoors-v11"
          >
            {locations.map((location, i) => {
              return <Marker 
                key={i} 
                latitude={location.latitude} 
                longitude={location.longitude} 
                offsetTop={-30} 
                offsetLeft={-20}>
                <div className="marker" id={location._id} onClick={handleClick}></div>
              </Marker>
            })}
          </ReactMap>
        </div>
        <div className="column">
          <div className="select">
            <select name="category" onChange={handleCategory}>
              <option value="Select" hidden defaultValue>Select</option>
              <option value="Bistro/Brunch">Bistro/Brunch</option>
              <option value="Coffee Shop">Coffee Shop</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Shop">Shop</option>
              <option value="Other">Other</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    {modal ? <LocationModal 
      toggleModal={toggleModal}
      locationId={locationId}/> : null}

  </section>
}

export default Map