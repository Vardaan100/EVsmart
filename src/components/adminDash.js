import React, { Component } from "react";
import { getAllDash, updateAdminUser } from "../fetchingData/api_calls";
import "./profile.css";
import { Table } from "reactstrap";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      edit: false,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      error: false,
      verification: false,
      role: "user",
      input: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    getAllDash(token).then((data) => {
      data.map((user_id, idx) => {
        this.setState({
          users: data,
        });
      });
    });
  }
  editbtn = (id) => {
    console.log("id is..", id);
    this.setState((state) => ({
      // edit: !this.state.edit,
      users: state.users.map((csid) => {
        if (csid.user_id === id.user_id) {
          console.log(id.user_id);
          return {
            ...csid,
            edit: !state.edit,
            log: console.log("state is if", !state.edit),
            // edit: this.state.edit,
          };
        } else {
          console.log("state is else", this.state.edit);
          return csid;
        }
      }),
      edit: !this.state.edit,
      // log: console.log("state is edit", !this.state.edit),
      // edit:state.edit
    }));
    this.editbtn = this.editbtn.bind(this);
  };
  renderTableData() {
    return this.state.users.map((data, index) => {
      const {
        user_id,
        user_firstname,
        user_lastname,
        user_phone,
        user_email,
        user_role,
        user_verification,
      } = data; //destructuring

      return (
        <tr key={user_id}>
          <td> {++index}</td>
          <td> {user_id}</td>
          <td>
            {" "}
            <input
              value={this.state.firstname}
              onChange={(e) => {
                this.setState({ firstname: e.target.value })}}
              placeholder={user_firstname}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.lastname}
              onChange={(e) => this.setState({ lastname: e.target.value })}
              placeholder={user_lastname}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder={user_email}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
            value={this.state.role}
            // onChange={(e) => this.setState({ firstname: e.target.value })}
              placeholder={user_role}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              placeholder={user_phone}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.verification}
              placeholder={user_verification}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            <button onClick={(e) => this.editbtn(data, e)} key={data.user_id}>
              {this.state.edit ? "Cancel" : "edit"}
            </button>
            <button>Save changes</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="adminDash">
        <Table>
          <thead>
            <tr>
              <th id="number">No.</th>
              <th>User Id</th>
              <th>User First Name</th>
              <th>User Last Name</th>
              <th>User Email</th>
              <th>User Role</th>
              <th>User Phone</th>
              <th>user verification</th>
              <th>User status</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AdminDash;

