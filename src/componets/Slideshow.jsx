import React from 'react';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../componets/Spinner'


function Slideshow () {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }


  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
  
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
  
    fetchListing()
  }, [navigate, params.listingId])
  
  if (loading) {
    return <Spinner />
  }

    return (
      <div className="slide-container">
        <Slide>
         {listing.imageUrls.map((url, index)=> (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${listing.imageUrls[index]})` }}>
               
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default Slideshow;

