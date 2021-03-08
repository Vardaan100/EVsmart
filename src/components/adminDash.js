import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { Table } from "reactstrap";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
      getAllDash(token).then((data) => {
        data.map((user_id, idx) => {
          this.setState({
            users: data
          });
        });
      });
   
  }

  renderTableData() {
    return this.state.users.map((data, index) => {
       const { user_id, user_firstname, user_lastname, user_phone, user_email, user_role, user_verification, 
      cs_status  } = data //destructuring
       return (
          <tr key={user_id}>
            <td>{user_id}</td>
             <td>{user_firstname}</td>
             <td>{user_lastname}</td>
             <td>{user_email}</td>
             <td>{user_role}</td>
             <td>{user_phone}</td>
             <td>{user_verification}</td>
             <td>{cs_status}</td>
             <td><button>edit</button></td>
          </tr>
       )
    })
 }

  render() {
    return (
      <div className="adminDash">
        <Table>
            <thead>
                <tr>
                    <th>User Id</th>
                    <th>User First Name</th>
                    <th>User Last Name</th>
                    <th>User Email</th>
                    <th>User Role</th>
                    <th>User Phone</th>
                </tr>
                </thead>
               <tbody>
                  {this.renderTableData()}
               </tbody>
            </Table>
      </div>
    );
  }
}

export default AdminDash;

