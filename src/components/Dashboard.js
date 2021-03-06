import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
// import cities from "../cities.json";
import L from "leaflet";
import { getallCS } from "../fetchingData/api_calls";

var img = window.location.origin + "/marker.png";
var img2 = window.location.origin + "/station.png";

const markerIcon = new L.Icon({
  iconUrl: img,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const markericon = new L.Icon({
  iconUrl: img2,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 19.7514798,
      lng: 75.7138884,
      zoom: 6,
      stations: [],
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
    getallCS().then((data) => {
      data.map((cs_id, idx) => {
        this.setState({
          stations: data,
        });
      });
    });
  }

  render() {
    return (
      <div classname="dashboard__container" style={{ marginTop: "-16px" }}>
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
              <Popup>You are here</Popup>
            </Marker>
          )}

        {this.state.stations.map((cs_id, idx) => (
          <Marker position={[cs_id.cs_latitude, cs_id.cs_longitude]} key={idx}
          icon={markericon}>
            <Popup>
              <div>
                <ul>
                  <li>
                    {cs_id.cs_openat}, {cs_id.cs_closeat}
                  </li>
                  <li>
                  {cs_id.cs_phone}
                  </li>
                  <li>
                  {cs_id.cs_cost}
                  </li>
                </ul>
              </div>
              <button
                onClick={()=> window.open(
                  `https://www.google.com/maps/search/?api=1&query=${parseFloat(cs_id.cs_latitude)},${parseFloat(cs_id.cs_longitude)}`, "_blank")}
              >
                Get Directions
              </button>
            </Popup>
          </Marker>
        ))}
        </MapContainer>
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 10000,
})(Dashboard);
