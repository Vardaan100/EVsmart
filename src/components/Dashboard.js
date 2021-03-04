import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import cities from "../cities.json";
<<<<<<< HEAD
import L from "leaflet";
import { Link } from 'react-router-dom'

var img = window.location.origin + "/marker.png"

const markerIcon = new L.Icon({
  iconUrl: img,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
=======
import { getallCS } from "../fetchingData/api_calls";
>>>>>>> d02984ba7c11bf4cae5ac279bfac2b01e5dac0ac

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 19.7514798,
      lng: 75.7138884,
      zoom: 6,
    };
  }

  getLatLng() {
    setTimeout(() => {
      this.setState({
        lat: this.props.coords ? this.props.coords.latitude : 19.7514798,
        lng: this.props.coords ? this.props.coords.longitude : 75.7138884,
      });
    }, 1000);
  }

  componentDidMount() {
    this.getLatLng();
    getallCS().then((data)=>{
      console.log(data); //viewing all the data
      console.log(data.length);
      console.log(data[0].cs_longitude, data[0].cs_latitude); //showing the long and lat to the user of the first station
    })
  }

  render() {
    console.log(this.state.lat, this.state.lng);

    return (
      <MapContainer
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {!this.props.coords ? (
          <div>Loading</div>
        ) : (
          <Marker 
          position={[this.state.lat, this.state.lng]}
          icon={markerIcon}
          >
            <Popup>
              You are here
            </Popup>
          </Marker>
        )}

        {cities.map((city, idx) => (
          <Marker position={[city.lat, city.lng]} key={idx}>
            <Popup>
              <div>
                <ul>
                <li>
                  {city.city}, {city.country}
                </li>
                <li>
                  {city.population}
                </li>
                <li>
                  {city.population_proper}
                </li>
                </ul>
              </div>
              <button
                onClick={()=> window.open(
                  `https://www.google.com/maps/search/?api=1&query=${parseFloat(city.lat)},${parseFloat(city.lng)}`, "_blank")}
              >
                Get Directions
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 10000,
})(Dashboard);
