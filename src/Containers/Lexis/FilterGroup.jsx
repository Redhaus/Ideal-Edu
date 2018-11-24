import React, { Component } from "react";
import _ from "lodash";
import { Button, Icon, Tag } from "antd";
import LexisFilterButton from './LexisFilterButton';




export default class FilterGroup extends Component {


    
// setup state for each button
  state = {
    clear: true,
    person: false,
    common: false,
    device: false,
    essential: false,
    concept: false,
    event: false,
    reset: false
  };

    //   function called for every button to assign bool checked status
  filterSelected = (item) => {

    // if clear then clear all
    if(this.props.lexisFilter.includes("clear")){
        return false;
    }
    
    // if in array of lexis filter return true
    return (this.props.lexisFilter.includes(item));

  }

  filterThings = () => {
    // get list of objects key for button titles
    const items = Object.keys(this.state);

    // map objects to make individual buttons
    const filters = items.map((item, key) => {
      return <LexisFilterButton 
                filterSelected={this.filterSelected(item)} // bool for each select
                lexisFilter={this.props.lexisFilter}  // array of filters
                storeFilters={this.props.storeFilters}  // function
                key={key}   
                title={item} >  
            </LexisFilterButton>;
    });

    // return JSX var to display
    return filters;
  };






  render() {
    return <div>{this.filterThings()}</div>;
  }
}



