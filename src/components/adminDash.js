import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { Table } from "reactstrap";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      edit: false,
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
          return {
            ...csid,
            edit: this.state.edit,
            log: console.log("state is if", this.state.edit),
            // edit: this.state.edit,
          };
        } else {
          console.log("state is else", this.state.edit);
          return csid, !this.state.edit;
        }
      }),
    }));
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
        cs_status,
      } = data; //destructuring

      return (
        <tr key={user_id}>
          <td> {++index}</td>
          <td> {user_id}</td>
          <td>
            {" "}
            <input placeholder={user_firstname} disabled={!this.state.edit}  />
          </td>
          <td>
            {" "}
            <input placeholder={user_lastname} disabled={!this.state.edit} />
          </td>
          <td>
            {" "}
            <input placeholder={user_email} disabled={!this.state.edit} />
          </td>
          <td>
            {" "}
            <input placeholder={user_role} disabled={!this.state.edit} />
          </td>
          <td>
            {" "}
            <input placeholder={user_phone} disabled={!this.state.edit} />
          </td>
          <td>
            {" "}
            <input
              placeholder={user_verification}
              disabled={!this.state.edit}
            />
            {/* {console.log(
              "verification",
              user_verification,
              "status",
              cs_status
            )} */}
          </td>
          <td>
            {" "}
            <input placeholder={cs_status} disabled={!this.state.edit} />{" "}
          </td>
          <td>
            <button onClick={() => this.editbtn(data)} key={data.user_id}>
              {this.state.edit ? "save changes" : "edit"}
            </button>
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

