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
    this.editbtn = this.editbtn.bind(this);
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
            <input
              value={this.state.firstname}
              onChange={(e) => this.setState({ firstname: e.target.value })}
              placeholder={user_firstname}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.input}
              onChange={(e) => this.setState(e.target.value)}
              placeholder={user_lastname}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.input}
              onChange={(e) => this.setState(e.target.value)}
              placeholder={user_email}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.input}
              placeholder={user_role}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.input}
              onChange={(e) => this.setState(e.target.value)}
              placeholder={user_phone}
              disabled={!this.state.edit}
            />
          </td>
          <td>
            {" "}
            <input
              value={this.state.input}
              onChange={(e) => this.setState(e.target.value)}
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
            <input
              onChange={(e) => this.setState(e.target.value)}
              value={this.state.input}
              placeholder={cs_status}
              disabled={!this.state.edit}
            />{" "}
          </td>
          <td>
            <button onClick={() => this.editbtn(data)} key={data.user_id}>
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

// import React, { useEffect, useState } from "react";
// import { getAllDash } from "../fetchingData/api_calls";
// import { Table } from "reactstrap";
// import { API } from "../config";

// function AdminDash() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const token = localStorage
//       .getItem("jwt")

//     getAllDash(token).then((data) => {
//       data.map((user_id, idx) => {
//         setData(data);
//       });
//     });
//   }, []);

//   const [inEditMode, setInEditMode] = useState({
//     status: false,
//     rowKey: null,
//   });

//   const [firstname, setFirstname] = useState(null);
//   const [lastname, setLastname] = useState(null);
//   const [phone, setPhone] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [role, setRole] = useState(null);
//   const [verification, setVerification] = useState(null);

//   /**
//    *
//    * @param id - The id of the product
//    * @param currentUnitPrice - The current unit price of the product
//    */
//   const onEdit = ({
//     user_id,
//     currentFirstname,
//     // lastname,
//     // phone,
//     // email,
//     // role,
//     // verification,
//   }) => {
//     setInEditMode({
//       status: true,
//       rowKey: user_id,
//     });
//     setFirstname(currentFirstname);
//     // setLastname(lastname);
//     // setPhone(phone);
//     // setEmail(email);
//     // setRole(role);
//     // setVerification(verification);
//   };

//   const updateUser = (user_id, token, newFirstname) => {
//     fetch(`${API}/admin/updateuser/${token}?${user_id}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user_id),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then(json => {
//           onCancel()
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   /**
//    *
//    * @param id -The id of the product
//    * @param newUnitPrice - The new unit price of the product
//    */
//    const onSave = ({id, newUnitPrice}) => {
//        updateInventory({id, newUnitPrice});
//    }

// //   // const onCancel = () => {
// //   //     // reset the inEditMode state value
// //   //     setInEditMode({
// //   //         status: false,
// //   //         rowKey: null
// //   //     })
// //   //     // reset the unit price state value
// //   //     setUnitPrice(null);
// //   // }

// //   return (
// //     <div className="container">
// //       <h1>User Data</h1>
// //       <Table>
// //         <thead>
// //           <tr>
// //             <th>User Id</th>
// //             <th>User First Name</th>
// //             <th>User Last Name</th>
// //             <th>User Email</th>
// //             <th>User Role</th>
// //             <th>User Phone</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((data) => (
// //             <tr key={data.user_id}>
// //               <td>{data.user_id}</td>
// //               <td>{data.user_firstname}</td>
// //               <td>{data.user_lastname}</td>
// //               <td>{data.user_email}</td>
// //               <td>{data.user_role}</td>
// //               <td>{data.user_phone}</td>
// //               {/* <td>
// //                                 {
// //                                     inEditMode.status && inEditMode.rowKey === item.id ? (
// //                                         <input value={unitPrice}
// //                                                onChange={(event) => setUnitPrice(event.target.value)}
// //                                         />
// //                                     ) : (
// //                                         item.unit_price
// //                                     )
// //                                 }
// //                             </td> */}
// //               {/* <td>
// //                                 {
// //                                     inEditMode.status && inEditMode.rowKey === item.id ? (
// //                                         <React.Fragment>
// //                                             <button
// //                                                 className={"btn-success"}
// //                                                 onClick={() => onSave({id: item.id, newUnitPrice: unitPrice})}
// //                                             >
// //                                                 Save
// //                                             </button>

// //                                             <button
// //                                                 className={"btn-secondary"}
// //                                                 style={{marginLeft: 8}}
// //                                                 onClick={() => onCancel()}
// //                                             >
// //                                                 Cancel
// //                                             </button>
// //                                         </React.Fragment>
// //                                     ) : (
// //                                         <button
// //                                             className={"btn-primary"}
// //                                             onClick={() => onEdit({id: item.id, currentUnitPrice: item.unit_price})}
// //                                         >
// //                                             Edit
// //                                         </button>
// //                                     )
// //                                 }
// //                             </td> */}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </div>
// //   );
// // }

// // export default AdminDash;
