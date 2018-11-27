import React, { Component } from "react";
import { Icon, Avatar } from "antd";
import { Select } from 'antd';



class TitleBar extends Component {

   

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
          minimized: !this.state.minimized
        });
      };



    handleChange = (value) => {
        console.log(`selected ${value}`);
    }


  render() {

    const Option = Select.Option;
    const {avatar, collapsed, toggle, title } = this.props;

    return (
      <div>
        <div className="title-container">
          <Icon
            className="trigger"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={toggle}
          />

          <div className="section-title">{title}</div>

          <div className="floatRight language-select">

        <Select defaultValue="en" style={{ width: 55 }} onChange={this.handleChange}>
            <Option value="en">EN</Option>
            <Option value="ch">CH</Option>
     
        </Select>

          

          <Avatar className="floatRight avatar" size="large" src={avatar} />
          </div>
        </div>
      </div>
    );
  }
}

export default TitleBar;
