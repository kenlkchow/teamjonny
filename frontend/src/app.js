import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ReactMap from 'react-map-gl'

import 'bulma'
import './style.scss'

import Home from './components/Home'
import Circle from './components/Circle'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/map' component={Map} />
      <Route exact path='/circle' component={Circle} />
    </Switch>
  </BrowserRouter>
)

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
      locations: {}
    }
  }

  componentDidMount() {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGVhNzRkODgzOGQ4N2MxZmU0ZDcwMmMiLCJpYXQiOjE1NzU2NDY0MjcsImV4cCI6MTU3NTczMjgyN30.y-CL4Z_6XuECIRWX7HjuYaiEjw8jzs9n6DDI4Y5wm9c' }
    })
      .then(resp => {
        const locations2 = []
        const locations1 = resp.data
        const promise = new Promise(function (resolve, reject) {
          locations1.forEach(location => {
            return (
              axios.get(`https://api.postcodes.io/postcodes/${location.postcode}`)
                .then(resp => {
                  console.log(resp.data.result.latitude, resp.data.result.longitude)
                  location.latitude = resp.data.result.latitude
                  location.longitude = resp.data.result.longitude
                  locations2.push(location)
                  resolve(locations2)
                })
                // .catch(err => reject(err))
            )
          })
        })
        return promise
      })
      .then(resp => this.setState({ locations: resp }))
    
  }

  render() {
    console.log(this.state.locations)
    return <div className="section">
      <ReactMap
        mapboxApiAccessToken="pk.eyJ1IjoiamdhciIsImEiOiJjazNicmRob2MwOTM0M2R1aW9iMjJpdHBxIn0.b-gHKxL-hNP7YOODnakv7Q"
        { ...this.state.viewport }
        onViewportChange={viewport => this.setState({ viewport })}
      >
      </ReactMap>
    </div>
  }
}



ReactDOM.render(<App />, document.getElementById('root'))