import React, { Component } from "react";
import ListView from "./ListView";
import LexisDetail from "./LexisDetail";

import { Row, Col, Input } from "antd";
import Scrollbar from "react-smooth-scrollbar";
import LexisData from "../Data_EN/lexisData";
import { Subscribe } from 'unstated'
import LexisStore from '../../Store/LexisStore';

const Search = Input.Search;

export default class Lexis extends Component {
  // setup state for search and detail content and props

  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      search: ""
    };
  }

  // this filters via search accepts lexis array, search term, and filters
  filterContacts = (lexis, search) => {
    search = search.toUpperCase();
    return search
      ? lexis.filter(lexis => lexis.word.toUpperCase().includes(search))
      : lexis;
  };

  //  search onchange
  onChange = event => {
    this.setState({ search: event.target.value });
  };

  // filter through Data to get selected based on id assign to state
  selectedDetail = id => {
    var detail = LexisData.filter(item => item.id === id);

    this.setState({
      detail: detail[0] //detail is array get first item
    });
  };

  render() {

    const { search } = this.state;
    // const lexis = null;
    // const lexis = this.filterContacts(lexisStore.state.LexisData, search)


    

    return (

      <Subscribe to={[LexisStore]}>
      {lexisStore => (

       

    
    
      <div className="lexis-wrapper">
        <Row className="lexis-row">
          <Col className="lexis-column" xs={{ span: 24 }} md={{ span: 8 }}>
            <div className="lexis-container">
              <div className="search-container">
                <Search
                  placeholder="Search..."
                  value={this.state.search}
                  onChange={this.onChange}
                  onSearch={value => console.log(value)}
                  className="lexis-search"
                />
              </div>

              <Scrollbar
                className="lexis-list"
                damping={0.1}
                thumbMinSize={20}
                syncCallbacks={false}
                renderByPixels={true}
                alwaysShowTracks={false}
                continuousScrolling={true}
              >

             {/* for lexis data provide filter function with store lexis and search term */}
                <ListView 
                  lexisData={this.filterContacts(lexisStore.state.lexisData, search)} 
                  selectedDetail={this.selectedDetail} 
                  selectedLexis={lexisStore.selectedLexis}// function
                  lexisSelected={lexisStore.state.lexisSelected}// Array of selected id's
                
                />
    


              </Scrollbar>
            </div>
          </Col>

          <Col className="lexis-detail" xs={{ span: 24 }} md={{ span: 16 }}>
            <div className="lexis-detail-container">
              <Scrollbar
                className="lexis-detail-list"
                damping={0.1}
                thumbMinSize={20}
                syncCallbacks={false}
                renderByPixels={true}
                alwaysShowTracks={false}
                continuousScrolling={true}
              >
                <LexisDetail detail={this.state.detail} />
              </Scrollbar>
            </div>
          </Col>
        </Row>
      </div>
)}
</Subscribe>

    );
  }
}
