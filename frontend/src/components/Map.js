import React, { useState, useEffect } from 'react'
import ReactMap, { Marker, Popup, GeolocateControl } from 'react-map-gl'
import axios from 'axios'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '50vw',
        height: '50vh',
        latitude: 51.51491,
        longitude: -0.07280,
        zoom: 16
      },
      locations: [{
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
        website: '',
        __v: 0,
        _id: ''
      }],
      showPopup: true
    }
  }

  componentDidMount() {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGVhNzRkODgzOGQ4N2MxZmU0ZDcwMmMiLCJpYXQiOjE1NzU4ODU0MjUsImV4cCI6MTU3NTk3MTgyNX0.5T7VEMCotsI0H7Rw6yl_Pr9T9BwxMrt6OOAmwLyxxcU' }
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
            this.setState({ locations: filteredLongLat })
          })
      })
  }

  render() {
    if (!this.state.locations || !this.state.viewport) {
      return <p className="Title">Loading...</p>
    }
    return <section className="section hero is-fullheight has-background-link">
      <div className="container has-text-centered">
        <ReactMap
          mapboxApiAccessToken="pk.eyJ1IjoiamdhciIsImEiOiJjazNicmRob2MwOTM0M2R1aW9iMjJpdHBxIn0.b-gHKxL-hNP7YOODnakv7Q"
          { ...this.state.viewport }
          onViewportChange={viewport => this.setState({ viewport })}
          // mapStyle="mapbox://styles/mapbox/outdoors-v11"
        >
          {this.state.locations.map((location, i) => {
            return <Marker 
              key={i} 
              latitude={location.latitude} 
              longitude={location.longitude} 
              offsetTop={-30} 
              offsetLeft={-20}>
              <div className="marker"></div>
            </Marker>
          })}
        </ReactMap>
      </div>
    </section>
  }
}

export default Map