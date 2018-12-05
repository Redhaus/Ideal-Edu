import React, { Component } from "react";
import LexisFilterButton from './LexisFilterButton';

import { Tag } from "antd";

const { CheckableTag } = Tag;


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
  };

    //  bool function called for every button to assign bool checked status
  filterSelected = (item) => {

    // if clear then clear all
    if(this.props.lexisFilter.includes("clear")){
        return false;
    }
    
    // if in array of lexis filter return true
    return (this.props.lexisFilter.includes(item));

  }


  // Create filter item buttoms based on state list of filters
  filterThings = () => {

    // get list of objects key for button titles array
    const items = Object.keys(this.state);

    // map objects to make individual buttons
    const filters = items.map((item, key) => {
      return <LexisFilterButton 
                filterCategory={this.props.filterCategory}
                filterSelected={this.filterSelected(item)} // bool function to determine each filter state
                lexisFilter={this.props.lexisFilter}  // array of filters
                storeFilters={this.props.storeFilters}  // function
                key={key}   
                title={item} >  
            </LexisFilterButton>;
           
    });

    // return JSX var to display
    return (
      <div>

              
              {filters}

              <CheckableTag
                // checked={this.props.filterSelected}
                checked={false}
                onChange={this.props.resetSelected}
              >
                Reset
              </CheckableTag>

      </div>
    )
  };





  // render filterThings JSX that is returned
  render() {
    return <div>{this.filterThings()}</div>;
  }
}




