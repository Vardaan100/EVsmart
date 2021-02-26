import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import cities from "../cities.json";
// import { fuel } from "../../public/images/fuel.png"
// import { marker } from "./images/marker.png"
// import L from "leaflet"

// const markerIcon = new L.Icon({
//     iconUrl: marker,
//     iconSize: [40, 40],
//     iconAnchor: [17, 46], //[left/right, top/bottom]
//     popupAnchor: [0, -46],
// })


class Dashboard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       lat: 19.7514798 ,
       lng: 75.7138884,
       zoom: 13,
    }
  }

  render(){

  const latitude = this.props.coords? this.props.coords.latitude : this.state.lat;
  const longitude = this.props.coords? this.props.coords.longitude : this.state.lng;
  console.log(latitude, longitude);

    return(
      <MapContainer center={[latitude, longitude]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          !this.props.coords?
          <div>Loading</div> : 
          <Marker position={[latitude, longitude]}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        } 

        {cities.map((city, idx) => (
            <Marker
                  position={[city.lat, city.lng]}
                  key={idx}
                  // icon={markerIcon}
                  > 
            <Popup>
              <div>
                <b>
                  {city.city}, {city.country}
                </b>
                </div>
                <button onClick={() => {
                window.location.href = `https://www.google.com/maps/search/?api=1&query=${parseFloat(city.lat)},${parseFloat(city.lng)}`
                }}>Get Directions</button>
            </Popup>
            </Marker>
          ))}
       
      </MapContainer>
    )
  }
}

export default geolocated({
  positionOptions:{
    enableHighAccuracy:true
  },
  userDecisionTimeout:10000
})(Dashboard)






