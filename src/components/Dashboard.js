import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import L from "leaflet";
import { getallCS } from "../fetchingData/api_calls";
import "./dashboard.css";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PhoneIcon from "@material-ui/icons/Phone";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { API } from "../config";

var img = window.location.origin + "/marker.png";
var img2 = window.location.origin + "/station.png";

// Img for showing users current location 
const markerIcon = new L.Icon({
  iconUrl: img,
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

// Img for showing the charging station
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
      station_id: "",
      popUpOpen: false
    };
  }
  
  
  // When booking slot popup is closed
  handleClose = () => {
    this.setState({
      popUpOpen: false,
    });
  };

  // Getting Longitude and Latitude of user and setting it in the state
  getLatLng() {
    setTimeout(() => {
      this.setState({
        lat: this.props.coords ? this.props.coords.latitude : 19.7514798,
        lng: this.props.coords ? this.props.coords.longitude : 75.7138884,
      });
    }, 1000);
  }

  // Fetching location data for all charging stations
  componentDidMount() {
    this.getLatLng();

    getallCS().then((data) => {
      console.log(data);
      data.map((cs_id, idx) => {
        return this.setState({
          stations: data,
        });
      });
    });
  }

  clickSubmit = () => {

    const { station_id } = this.state;
    const token = localStorage.getItem("jwt");

    fetch(`${API}/message/booked/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ csid: station_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
      this.setState({
        popUpOpen: true
      })
  };

  
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
                <div className="buttons">
                  <div>
                    <button
                      variant="contained" 
                      color="primary"
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
                  </div>
                  <div>
              
              <button 
              className="dashboard__getdirections"
              onMouseOverCapture={() => {
                this.state.stations.filter((id, index) => {
                  if (id === cs_id) {
                    this.setState({
                      station_id: this.state.stations[index].cs_id,
                    });
                  }
                  // console.log(this.state.station_id);
                });
              }} 
              onClick={this.clickSubmit}>
                Book now
             </button>
              <Dialog
                  open={this.state.popUpOpen}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
              >
              <DialogTitle id="alert-dialog-title">{"Notification"}</DialogTitle>
              <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Thank you for booking this station. Your number has been sent successfully to charging station owner. He will contact you soon.
              </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                  Ok
              </Button>
              </DialogActions>
              </Dialog>
              </div>
                  </div>
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
