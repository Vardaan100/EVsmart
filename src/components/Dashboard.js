import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import cities from "../cities.json";

class Dashboard extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       lat: 19.7514798,
       lng: 75.7138884,
       zoom: 6,
    }
  }

  getLatLng() {
    setTimeout(() => {
      this.setState({
        lat: this.props.coords ? this.props.coords.latitude : 19.7514798,
        lng: this.props.coords ? this.props.coords.longitude : 75.7138884
      })
      
    }, 1000);
  }

  componentDidMount() {
    this.getLatLng()
  }


  render(){

    console.log(this.state.lat, this.state.lng);

    return(
      <MapContainer center={[this.state.lat, this.state.lng]} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          !this.props.coords?
          <div>Loading</div> : 
          <Marker position={[this.state.lat, this.state.lng]}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
        } 

        {cities.map((city, idx) => (
            <Marker
                  position={[city.lat, city.lng]}
                  key={idx}
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

