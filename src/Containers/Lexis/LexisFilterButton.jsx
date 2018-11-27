import React, { Component } from "react";
import { Tag } from "antd";

const { CheckableTag } = Tag;

export default class LexisFilterButton extends Component {
  //   Function that adds filter name to array
  handleChange = checked => {
    this.props.storeFilters(this.props.title);
    this.props.filterCategory(this.props.lexisFilter)

  };

  render() {
    return (
      // check state based on bool filter function from FilterGroup
      <CheckableTag
        checked={this.props.filterSelected}
        onChange={this.handleChange}
      >
        {this.props.title}
      </CheckableTag>
    );
  }
}
