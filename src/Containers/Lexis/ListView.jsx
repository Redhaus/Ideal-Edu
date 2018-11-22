import React, { Component } from "react";
import { List, Switch, Icon } from "antd";
import ListItem from "./ListItem";
// import { Subscribe } from 'unstated'
// import LexisStore from '../../Store/LexisStore';

export default class ListView extends Component {


  itemClicked = id => {
    this.props.selectedDetail(id);
  };



// check if filters includes item if it does highlight the icon 
iconHighlight = (item, icon, key) => {
  if(item){
    return <Icon className='icon-style active-icon' key={key} type={icon}/> 
  }else{
    return <Icon className="icon-style" key={key} type={icon}/> 
  }

}



icon = (icons) => {

  // iterates through icon array for each item and returns icons associated with that array
  return icons.map( (item, key) => {

    switch (item) {

      case 'person':
        return this.iconHighlight(item, "user", key )

      case 'common':
        return this.iconHighlight(item, "global", key )

      case 'device':
        return this.iconHighlight(item, "hourglass", key )
       
      case 'essential':
        return this.iconHighlight(item, "compass", key )

      case 'concept':
        return this.iconHighlight(item, "bulb", key )

      case 'event':
        return this.iconHighlight(item, "calendar", key )
    
      default:
        break;
    }

    return false;
    
  })
}

renderIcons = () => {

}



 

  render() {
    return (


      // <Subscribe to={[LexisStore]}>
      // {lexisStore => (

      <div>
        <List
          size="small"
          bordered
          dataSource={this.props.lexisData}
          renderItem={word => (
            <ListItem
              key={word.id}
              id={word.id}
              itemClicked={this.itemClicked}
              word={word.word}
              selectedLexis={this.props.selectedLexis}// function
              lexisSelected={this.props.lexisSelected}// Array of selected id's
              icons={this.icon(word.icons)}
            
            />
          )}
          // renderItem={word => (<List.Item onClick={() => this.itemClicked(word.id)} className="lexis-item"><Switch size="small" />{word.word}</List.Item>)}
        />
      </div>




// )}
// </Subscribe>

    );

  }
}
