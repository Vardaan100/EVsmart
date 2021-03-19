import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { Button, Table } from "reactstrap";
import { Input } from "@material-ui/core";
import { API } from "../config";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      edit: null,
      uid: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      error: false,
      verification: false,
      role: "user",
      Input: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    getAllDash(token).then((data) => {
      this.setState({ users: data });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.edit !== this.state.edit) {
      if (this.state.edit) {
        const user = this.state.users.find(
          (user) => user.user_id === this.state.edit
        );

        if (user) {
          this.setState({
            uid: user.user_id,
            firstname: user.user_firstname,
            lastname: user.user_lastname,
            phone: user.user_phone,
            email: user.user_email,
            verification: user.user_verification,
            role: user.user_role,
          });
        }
      } else {
        this.setState((prevState) => ({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          verification: false,
          role: "user",
        }));
      }
    }
  }

  editbtn = (data) => {
    const { user_id } = data; //destructuring
    this.setState((prevState) => ({
      //checking edit null or have user_id
      edit: prevState.edit === user_id ? null : user_id,
    }));
    this.editbtn = this.editbtn.bind(this);
  };
  saveData = () => {
    this.setState((prevState) => ({
      users: prevState.users.map((user) =>
        user.user_id === prevState.edit
          ? {
              ...user,
              user_firstname: prevState.firstname,
              user_lastname: prevState.lastname,
              user_phone: prevState.phone,
              user_email: prevState.email,
              user_role: prevState.role,
              user_verification: prevState.verification,
            }
          : user
      ),
      edit: null,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      verification: false,
      role: "user",
    }));
    let {
      uid,
      firstname,
      lastname,
      phone,
      email,
      verification,
      role,
    } = this.state;
    let token = localStorage.getItem("jwt");

    fetch(`${API}/admin/updateuser/${token}?userid=${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        verification: verification,
        role: role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
      const isEditable = this.state.edit === user_id;
      return (
        <tr key={user_id}>
          <td> {++index}</td>
          <td size="sm"> {user_id}</td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.firstname : user_firstname}
              onChange={(e) => this.setState({ firstname: e.target.value })}
              placeholder={user_firstname}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.lastname : user_lastname}
              onChange={(e) => this.setState({ lastname: e.target.value })}
              placeholder={user_lastname}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.email : user_email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder={user_email}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.role : user_role}
              onChange={(e) => this.setState({ role: e.target.value })}
              placeholder={user_role}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.phone : user_phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              placeholder={user_phone}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.verification : user_verification}
              onChange={(e) => this.setState({ verification: e.target.value })}
              placeholder={user_verification}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <Input
              value={isEditable ? this.state.Input : cs_status}
              onChange={(e) => this.setState({ Input: e.target.value })}
              placeholder={cs_status}
              disabled={!isEditable}
            />{" "}
          </td>
          <td>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "10%" }}>
                <Button onClick={() => this.editbtn(data)} key={data.user_id}>
                  {isEditable ? "Cancel" : "edit"}
                </Button>
                <Button style={{ margin: "4px" }} onClick={this.saveData}>
                  Save
                </Button>
              </div>
              <div></div>
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="adminDash">
        <Table striped bordered hover size="sm" variant="dark">
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
              <th>Charging station status</th>
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default AdminDash;
