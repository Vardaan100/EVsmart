import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
// import { fuel } from "../../public/images/fuel.png"
// import { marker } from "./images/marker.png"

class Map extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       lat: 19.7514798 ,
       lng: 75.7138884,
       zoom: 6,
    }
  }


  render(){

  const latitude = this.props.coords? this.props.coords.latitude : this.state.lat;
  const longitude = this.props.coords? this.props.coords.longitude : this.state.lng;
  console.log(latitude, longitude);

    return(
          <div>
      <MapContainer center={[latitude, longitude]} zoom={this.state.zoom} style={{width:"100%", height:"80vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          !this.props.coords?
          <div>Loading</div> : 
          <Marker position={[latitude, longitude]}>
            <Popup>
            {this.state.lat}, {this.state.lng}
            </Popup>
          </Marker>
        } 
      </MapContainer>
      <div>
        <button>Save location</button>
      </div>
      </div>
     
    )
  }
}

export default geolocated({
  positionOptions:{
    enableHighAccuracy:true
  },
  userDecisionTimeout:10000
})(Map)






