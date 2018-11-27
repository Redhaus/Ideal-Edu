import React, { Component } from "react";

// layout
import { Icon } from "antd";
import ListItem from "./ListItem";



class ListView extends Component {

  // Shows detail on rollover
  itemRollover = id => {
    this.props.selectedDetail(id);
  };

  // check if filters includes item if it does highlight the icon - NEEDS WORK
  iconHighlight = (item, icon, key) => {
    if (item) {
      return <Icon className="icon-style active-icon" key={key} type={icon} />;
    } else {
      return <Icon className="icon-style" key={key} type={icon} />;
    }
  };

  // iterates through icon array for each word and returns icons associated with that word
  icon = icons => {
    return icons.map((item, key) => {
      switch (item) {
        case "person":
          return this.iconHighlight(item, "user", key);

        case "common":
          return this.iconHighlight(item, "global", key);

        case "device":
          return this.iconHighlight(item, "hourglass", key);

        case "essential":
          return this.iconHighlight(item, "compass", key);

        case "concept":
          return this.iconHighlight(item, "bulb", key);

        case "event":
          return this.iconHighlight(item, "calendar", key);

        default:
          break;
      }

      return false;
    });
  };


  render() {

    // creates list items based on each LexisData item
    const listItems = () => {

      return this.props.lexisData.map((word) => {
        return (
          <ListItem
            key={word.id}
            id={word.id}
            itemRollover={this.itemRollover}
            word={word.word}
            selectedLexis={this.props.selectedLexis} // function
            lexisSelected={this.props.lexisSelected} // Array of selected id's
            icons={this.icon(word.icons)}
          />
        );
      });


      
    };

    
    // returns the function results to display all items
    return <div className="list-items-view">{listItems()}</div>;
  }
}

//connect lexisdata to props
export default ListView;
