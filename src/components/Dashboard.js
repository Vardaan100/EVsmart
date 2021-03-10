import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
// import cities from "../cities.json";
import L from "leaflet";
import { getallCS, userData } from "../fetchingData/api_calls";
import "./dashboard.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PhoneIcon from "@material-ui/icons/Phone";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Language } from "@material-ui/icons";
import { MSG, auth } from "../config"

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
      user_number: "",
      provider_number: "",
      username: "",
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
    const token = localStorage
      .getItem("jwt");
    userData(token).then((data) => {
      this.setState((state) => ({
        user_number: data[0].user_phone,
        username: data[0].user_firstname,
      }));
    });

    this.getLatLng();

    getallCS().then((data) => {
      data.map((cs_id, idx) => {
        return this.setState({
          stations: data,
        });
      });
    });
  }

clickSubmit = () => {

  const { user_number, provider_number, username } = this.state;

  fetch(`${MSG}`, { 
      
    // Adding method type 
    method: "POST",
      
    // Adding body or contents to send 
    body: JSON.stringify({ 
      route: "v3",
      sender_id: "TXTIND",
      langauge: "english",
      flash: 0,
      numbers: provider_number,
      message_text: `Hi, ${username} has booked at your station. For any queries
      you can contact him. His number is ${user_number}`
    }), 
      
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json",
        "authorization": auth
    } 
})  

// Converting to JSON 
.then(response => response.json()) 
  
// Displaying results to console 
.then(json => console.log(json)); 
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
            <Marker
              position={[cs_id.cs_latitude, cs_id.cs_longitude]}
              key={idx}
              icon={markericon}
            >
              <Popup>
                <div className="popups">
                  <ul>
                    <li>
                      <AccessTimeIcon />
                      {cs_id.cs_openat} To {cs_id.cs_closeat}
                    </li>
                    <li>
                      {" "}
                      <PhoneIcon /> {cs_id.cs_phone}
                    </li>
                    <li>
                      {" "}
                      <AttachMoneyIcon />
                      <strong> {cs_id.cs_cost}</strong>
                    </li>
                  </ul>
                </div>
                <button
                  className="dashboard__getdirection"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${parseFloat(
                        cs_id.cs_latitude
                      )},${parseFloat(cs_id.cs_longitude)}`,
                      "_blank"
                    )
                  }
                >
                  Get Directions
                </button>
                <button className="dashboard__getdirection"
                // onClick={async() => {
                //   this.state.stations.filter((id, index) => {
                //     if (id === cs_id){
                //       this.setState({
                //         provider_number: this.state.stations[index].cs_phone
                //       })
                //     }
                //   })
                // }}
                onClick={this.clickSubmit}>Book charging station</button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>=
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
