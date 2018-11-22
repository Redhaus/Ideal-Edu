import React, { Component } from "react";
import { List, Switch , Icon} from "antd";

let currentID = null;


function ListItem(props) {





    const itemClickHelper = (id) => {
        props.selectedLexis(id);
        props.itemClicked(id);
    };

    const itemRollHelper = (id) => {

        currentID = id;
        props.itemClicked(id);
       
    }



  // render() {

    

    
      

    const { word, id, lexisSelected, icons } = props;

       
    //set active class if rolled over  
    const activeClass = (currentID === id ) ? 'active' : '';

    // if lexis select contains the object add selected
    const selectedClass =  lexisSelected.includes(id) ? 'selected' : '';
    

    return (

  


      <List.Item
        className={`${activeClass} ${selectedClass} lexis-item`} 
        onClick={() => itemClickHelper(id)} // item clicked Change
        onMouseEnter={() => itemRollHelper(id)} // Rollover Change
      >

        <Switch size="small" checked={selectedClass ? true : false} />
        {word}

        <span className="icon-container"> { icons} </span>
      </List.Item>



    );
  }


  export default ListItem;
 
// }
