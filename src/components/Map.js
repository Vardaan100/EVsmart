import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { geolocated } from "react-geolocated";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./map.css";


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 19.7514798,
      lng: 75.7138884,
      zoom: 6,
    };
  }
  // Receiving the location and handling routing
  render() {
    const latitude = this.props.coords
      ? this.props.coords.latitude
      : this.state.lat;
    const longitude = this.props.coords
      ? this.props.coords.longitude
      : this.state.lng;
    // console.log("lat", latitude, "log", longitude);
    let redirect = () => {
      getlocation();
      if (this.props.location.state.detail) {
        this.props.history.push({
          pathname: "/station",
        });
      } else {
        this.props.history.push({
          pathname: "/station-profile",
        });
      }
    };

    // Getting the current location of the user from redux store
    let getlocation = () => {
      let action = {
        type: "get_location",
        payload: [latitude, longitude],
      };
      if (this.props.dispatch(action)) {
        console.log(`lat ${latitude} and log ${longitude}`);

        return this.props.dispatch(action);
      }

      // return <Link to="/station"> linkskdbvsd </Link>;
    };
    return (
      <div>
        <MapContainer
          center={[latitude, longitude]}
          zoom={this.state.zoom}
          style={{ width: "100%", height: "80vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {!this.props.coords ? (
            <div>Loading...</div>
          ) : (
            <Marker position={[latitude, longitude]}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
        <div>
          <Button className="primary map__setlocation" onClick={redirect}>
            Save location
          </Button>
        </div>
      </div>
    );
  }
}

let location = geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 10000,
})(Map);

function msp(state) {
  console.log("state is ", state);
}

function mdp(dispatch) {
  return {
    dispatch,
  };
}
export default connect(msp, mdp)(location);
