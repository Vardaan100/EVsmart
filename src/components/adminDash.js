import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { JsonToTable } from "react-json-to-table";
import { Table } from "reactstrap";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }
  state1 = () => {
    this.setState({ users: this.state.users });
  };
  getdata() {
    setTimeout(() => {
      // this.setState({
      // users:
      // this.state.users.length == 0 ? this.state.users : "data loading..",
      // });
    }, 1000);
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    getAllDash(token).then((data) => {
      // data.map((user_id, idx) => {
      return data.map((data, idx) => {
        return this.setState({
          log: console.log("alldata", data),
          users: data,
          // users: (
          // <Table responsive key={data.user_id}>
          //   <thead>
          //     <tr>
          //       <th>NO</th>
          //       <th>user_id</th>
          //       <th>user_firstname</th>
          //       <th>user_lastname</th>
          //       <th>user_phone</th>
          //       <th>user_email</th>
          //       <th> user_password</th>
          //       <th>user_verification</th>
          //       <th>cs_status </th>
          //       <th>user_created_at </th>
          //       <th>user_updated_at </th>
          //       <th>user_role </th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     <tr>
          //       <th scope="row">1</th>
          //       <td>{data.user_id} </td>
          //       <td>{data.user_firstname}</td>
          //       <td>{data.user_lastname}</td>
          //       <td>{data.user_phone}</td>
          //       <td>{data.user_email}</td>
          //       <td>{data.user_password}</td>
          //       <td>{data.user_verification}</td>
          //       <td>{data.cs_status}</td>
          //       <td>{data.user_created_at}</td>
          //       <td>{data.user_updated_at}</td>
          //       <td>{data.user_role}</td>
          //     </tr>
          //   </tbody>
          // </Table>
          // ),
        });
      });
    });
  }

  allData = this.state;
  render() {
    let {
      user_id,
      user_firstname,
      user_lastname,
      user_phone,
      user_email,
      user_password,
      user_verification,
      cs_status,
      user_created_at,
      user_updated_at,
      user_role,
    } = this.state;
    let name = async () => {
      await this.state.users.user_firstname;
    };
    return (
      <div className="adminDash">
        {/* <JsonToTable json={this.state.users} /> */}
        {/* {("from render", console.log(this.state.users))} */}
        {console.log("userrrr data", this.state.users)}
        {this.state.users.length == 0
          ? this.state.users.map((data) => data.user_firstname)
          : this.state.users.user_firstname}

        {console.log("username", this.state.users.user_firstname)}
        {/* { this.state.users.user_firstname} */}
        {/* {this.allData} */}
        {/* {name()} */}
      </div>
    );
  }
}

export default AdminDash;
