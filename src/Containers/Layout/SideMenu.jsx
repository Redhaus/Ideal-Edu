import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "antd";

class SideMenu extends Component {


  render() {
    const menuItems = this.props.data.map((item, key) => (
      <Menu.Item key={key}>
        <NavLink to={item.link}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </NavLink>
      </Menu.Item>
    ));

    return (
      <Menu
        className="menu-padding side-menu-style"
        mode="inline"
        defaultSelectedKeys={["1"]}
      >
        {menuItems}
      </Menu>
    );
  }
}

export default SideMenu;
