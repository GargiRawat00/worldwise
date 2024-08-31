import React, { useEffect } from 'react'

import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker,Popup, useMap, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import {useCities} from '../contexts/CitiesContext'
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button'
import useURLPosition from '../hooks/useURLPosition';
export default function Map() {
    
    //console.log(mapLat,mapLng);
    //const position = [51.505, -0.09];
    const {cities}=useCities();
    const [mapPosition,setMapPosition]= useState([40,0]);
    const {
      isLoading: isLoadingPosition,
      position:geoLocationPosition,
      getPosition
    }=useGeolocation();
    const[mapLat,mapLng]=useURLPosition();
    useEffect(
      function()
      {
        if(mapLat && mapLng)
          setMapPosition([mapLat,mapLng]);
      },
      [mapLat,mapLng]
    );
    useEffect(
      function(){
        if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng]);
      },
      [geoLocationPosition]
    );
    return (
    <div className={styles.mapContainer}>
      
          <Button type="position" onClick={getPosition}>
            {isLoadingPosition?'Loading...':'Use Your Position'}
          </Button>
          <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city)=>(
            <Marker key={city.id} position={[city.position.lat,city.position.lng]}>
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
            ))
            }
            <ChangeCenter position={mapPosition}/>
            <DetectClick/>
          </MapContainer>
        </div> )
}          
   

function ChangeCenter({position})
{
  const map=useMap();
  map.setView(position);
  return null;
}
function DetectClick()
{
  const navigate=useNavigate();
  useMapEvents({
    click:(e)=>navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}