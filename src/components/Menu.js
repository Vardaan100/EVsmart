import React from "react";
import { Menu } from "antd";
// var Menu = require('antd/lib/menu')

import {
  IdcardTwoTone,
  FileUnknownTwoTone,
  UnlockTwoTone,
  EuroTwoTone,
  HomeTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Menu.css";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

class Menus extends React.Component {
  handleClick = (e) => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 200 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        className="More"
      >
        <SubMenu
          key="sub2"
          className="main"
          icon={<HomeTwoTone />}
          title="Menu"
          style={{ fontSize: "20px" }}
        >
          <Menu.Item key="5" className="sub">
            <IdcardTwoTone />
            <strong>Profile</strong>
          </Menu.Item>
          <Menu.Item key="6" className="sub">
            <FileUnknownTwoTone />
            <strong>Help</strong>
          </Menu.Item>
          <Menu.Item key="7" className="sub">
            <EuroTwoTone />
            <strong>Station List</strong>
          </Menu.Item>
          <Link to={"./station"}>
            <Menu.Item key="5" className="sub">
              <UnlockTwoTone />
              <strong>Add Station</strong>
            </Menu.Item>
          </Link>
        </SubMenu>
      </Menu>
    );
  }
}
export default Menus;
