import React, { Component } from "react";
import { Switch } from "antd";

let currentID = null;

class ListItem extends Component {
  constructor(props) {
    super(props);

    // state will control active rollover status
    this.state = {
      active: ""
    };

  }

  // function that prevents all individual items from rerendering 
  // unless they meet specific criteria / improves performance dramatically
  shouldComponentUpdate(nextProps) {
    if (currentID === this.props.id) {
      return true;
    }
    if (this.state.active) {
      return true;
    }
    return false;
  }


  // When Item is clicked adds id to lexisSelected array
  itemClickHelper = id => {
    this.props.selectedLexis(id);
  };

  // On rollover set Active State and change Detail displayed
  itemRollHelper = id => {

    currentID = id; //helps determine rerender

    this.props.itemRollover(id);

    this.setState({
      active: "active"
    });
  };


  render() {

    // deconstruct props
    const { word, id, lexisSelected, icons } = this.props;

    // if lexis select contains the object add selected class
    let selectedClass = lexisSelected.includes(id) ? "selected" : "";

    // if item rollout clear active hightlight
    const rolloutHelper = () => {
      this.setState({
        active: ""
      });
    };


    return (
      <div
        // adds active and selected class as needed
        className={`${this.state.active} ${selectedClass} lexis-item`}
        onClick={() => this.itemClickHelper(id)} // item clicked Change
        onMouseEnter={() => this.itemRollHelper(id)} // Rollover Change
        onMouseLeave={rolloutHelper} // clears active
      >
        <Switch size="small" checked={selectedClass ? true : false} />
        {word}

        <span className="icon-container"> {icons} </span>
      </div>
    );
  }
}

export default ListItem;

// }
