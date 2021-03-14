import React, { Component } from "react";
import { getAllDash, updateAdminUser } from "../fetchingData/api_calls";
import "./profile.css";
import { Button, Modal, Table } from "reactstrap";
import { Input, makeStyles } from "@material-ui/core";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      edit: null,
      uid: "",
      // edit: false,
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      error: false,
      verification: false,
      role: "user",
      input: "",
    };
    this.editbtn = this.editbtn.bind(this);
  }

  // componentDidMount() {
  //   const token = localStorage.getItem("jwt");
  //   getAllDash(token).then((data) => {
  //     data.map((user_id, idx) => {
  //       this.setState({
  //         users: data,
  //       });
  //     });
  //   });
  // }

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
    const { user_id } = data;
    this.setState((prevState) => ({
      edit: prevState.edit === user_id ? null : user_id,
    }));
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
    updateAdminUser(
      { firstname, lastname, email, phone, verification, role },
      token,
      uid
    );

    console.log("User id", uid);
    console.log("updateAdminUser", updateAdminUser);
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
          <td> {user_id}</td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.firstname : user_firstname}
              onChange={(e) => this.setState({ firstname: e.target.value })}
              placeholder={user_firstname}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.lastname : user_lastname}
              onChange={(e) => this.setState({ lastname: e.target.value })}
              placeholder={user_lastname}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.email : user_email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder={user_email}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.role : user_role}
              onChange={(e) => this.setState({ role: e.target.value })}
              placeholder={user_role}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.phone : user_phone}
              onChange={(e) => this.setState({ phone: e.target.value })}
              placeholder={user_phone}
              disabled={!isEditable}
            />
          </td>
          <td>
            {" "}
            <input
              value={isEditable ? this.state.verification : user_verification}
              onChange={(e) => this.setState({ verification: e.target.value })}
              placeholder={user_verification}
              disabled={!isEditable}
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
            <input
              value={isEditable ? this.state.input : cs_status}
              onChange={(e) => this.setState({ input: e.target.value })}
              // onChange={(e) => this.setState(e.target.value)}
              // value={this.state.input}
              placeholder={cs_status}
              disabled={!isEditable}
            />{" "}
          </td>
          <td>
            <button onClick={() => this.editbtn(data)} key={data.user_id}>
              {isEditable ? "Cancel" : "edit"}
            </button>
            <button onClick={this.saveData}>Save changes</button>
          </td>
        </tr>
      );
    });
  }
  useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "35%",
      left: "30%",
    },
  }));

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
