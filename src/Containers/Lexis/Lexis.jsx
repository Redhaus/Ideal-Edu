  // TODO: Filter and connect work but filter is one click behind
// MAKE SELECTED DETAIL FUNCTION WORK




import React, { Component } from "react";

// components
import ListView from "./ListView";
import LexisDetail from "./LexisDetail";
import FilterGroup from "./FilterGroup";

// UI elements
import { Row, Col, Input } from "antd";
import Scrollbar from "react-smooth-scrollbar";

// Unistore functions
import { connect } from "unistore/react"; //import connect HOC function
import { actions } from "../../Store/Unistore"; //import actions

const Search = Input.Search;
// const TotalLexis = null;

class Lexis extends Component {

  // setup state for search and detail content and props
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      search: "",
      totalLexis: this.props.LexisData,
      filters: false
    };
  }

  componentDidMount(){
    this.props.detailUpdate();
    console.log(this.props.lexisDetail)
  }


  filterHelper = (props) => {
    this.props.filterCategory()
    this.props.detailUpdate();
    this.props.filterSearch()
  }

  //  search onchange function call
  onChange = event => {
    // store search term in var
    let searchUpdate = event.target.value;
    this.props.filterCategory();
    this.props.searchTerm(searchUpdate)

    // update search state, once search updated callback function to filter totalLexis
    this.setState(
      () => {
        return { search: searchUpdate };
      }
    );
    // this.props.filterSearch(this.props.LexisData, searchUpdate)
    this.props.filterSearch(searchUpdate)
    this.props.detailUpdate();

  };

  // filter through LexisData to get selected based on id assign to state
  selectedDetail = id => {

    this.props.detailRollover(id);
    
  };

  render() {

    // this.props.filterSearch();
    const { lexisSelected, lexisFilter } = this.props; //data
    const { selectedLexis, storeFilters, filteredLexis, resetSelected } = this.props; //actions
    const { search } = this.state; //search


    return (
      <div className="lexis-wrapper">
        {/* Filter Group buttons */}
        <Row className="lexis-row">
          <FilterGroup
            
            filterCategory={this.filterHelper}
            lexisFilter={lexisFilter}
            storeFilters={storeFilters}
            resetSelected={resetSelected}
          />
        </Row>

        {/* Lexis List column */}
        <Row className="lexis-row">
          <Col className="lexis-column" xs={{ span: 24 }} md={{ span: 8 }}>
            <div className="lexis-container">
              {/* Search field */}
              <div className="search-container">
                <Search
                  placeholder="Search..."
                  value={search}
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
                  lexisFilter={lexisFilter}
                  lexisData={filteredLexis} // Lexis data array
                  selectedDetail={this.selectedDetail} // helper function
                  selectedLexis={selectedLexis} // action function
                  lexisSelected={lexisSelected} // Array of selected id's
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
                <LexisDetail detail={this.props.lexisDetail} />
              </Scrollbar>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

// with connect function pass store data [] and action functions to props
export default connect(
  ["lexisSelected", "LexisData", "lexisID", "lexisFilter", "filteredLexis", "lexisDetail" ],
  actions
)(Lexis);
