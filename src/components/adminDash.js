// import React, { Component } from "react";
// import { getAllDash } from "../fetchingData/api_calls";
// import "./profile.css";
// import { JsonToTable } from "react-json-to-table";

// class AdminDash extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       users: [],
//     };
//   }

//   componentDidMount() {
//     const token = localStorage
//       .getItem("jwt", JSON.stringify())
//       .replaceAll('"', "");
//     getAllDash(token).then((data) => {
//       data.map((user_id, idx) => {
//         this.setState({
//           users: data,
//         });
//       });
//     });
//   }

//   render() {
//     return (
//       <div className="adminDash">
//         <JsonToTable json={this.state.users} />
//       </div>
//     );
//   }
// }

// export default AdminDash;


import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { createHashHistory } from "history";
import { Provider } from "react-redux";

const dataProvider = jsonServerProvider
 (
'https://jsonplaceholder.typicode.com'
 );

const AdminDash = () => 

<Admin dataProvider={dataProvider} >

<Resource name="users" list={ListGuesser} />

</Admin>;

export default AdminDash
