import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { JsonToTable } from "react-json-to-table";

class AdminDash extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       users : []
    }
  }
  
  
  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
      getAllDash(token).then((data) => {
        data.map((user_id, idx) => {
          this.setState({
            users: data
          })
        })
    });
  }

  render() {

    return (
      <div className="adminDash">
          <JsonToTable json={this.state.users} />
      </div>
    );
  }
}


export default AdminDash;

// import React, { Component } from 'react';
// import { Admin, Resource } from "react-admin";
// import restProvider from "ra-data-simple-rest";
// import { getAllDash } from "../fetchingData/api_calls";
// import UserList from "./UserList"

// export default class adminDash extends Component {
  
  
//   render(props) {

//     const { history } = this.props

//     return (
//     <Admin dataProvider={restProvider(getAllDash)} {...history} >
//       <Resource name="user" list={UserList} />
//     </Admin>
//     )
//   }
// }


