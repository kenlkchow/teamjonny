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

  useEffect(() => {
    axios.get('/api/locations/available', {
      headers: { Authorization: 'Bearer ' + Auth.getToken() }
    })
      .then(resp => {
        setLocations(resp.data)
      })
  }, [])

  return <section className="section">
    <div className='container'>
      <Accordion
        allowMultipleExpanded={true}
        allowZeroExpanded={true}

      >
        {locations.map((location, i) => {
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
                <p>
                  Created by: {location.user.username}
                </p>
                <Link className="button is-success" to={`/edit/${location._id}`}>Edit</Link>
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