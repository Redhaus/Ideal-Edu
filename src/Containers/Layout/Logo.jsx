import React, { Component } from 'react'

export default class Logo extends Component {


  render() {


    const {logo, collapsed, icon } = this.props;

    return (
     

          <div className="logoContainer">
            {collapsed ? (
              <div className="icon">
                {" "}
                <img alt="icon" src={icon} />{" "}
              </div>
            ) : (
              <div className="logo">
                {" "}
                <img alt="logo" src={logo} />{" "}
              </div>
            )}
          </div>
        
     
    )
  }
}
