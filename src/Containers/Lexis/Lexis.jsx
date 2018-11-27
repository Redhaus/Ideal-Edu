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

  // TODO: Connect search and filters to totalLexis

  // setup state for search and detail content and props
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      search: "",
      totalLexis: this.props.LexisData
    };
  }

  // this filters via search accepts lexis array, search term, and filters
  filterSearch = (lexis, search) => {
    search = search.toUpperCase();
    console.log("fired");
    return search
      ? lexis.filter(lexis => lexis.word.toUpperCase().includes(search))
      : lexis;
  };

  // This is the function that will filter the totalLexis based on category selections
  filterCategory = (lexis, filters) => {
    console.log(filters);
    lexis.map(item => {
      return console.log(item.icons);
    });
    // const testLex = lexis.every(i => filters )
    return lexis;

    // return filters
    // ? lexis.filter
    // :

    // console.log(this.props.lexisFilter.includes(item))
    // var containsAll = arr1.every(i => arr2.includes(i));
  };

  //  search onchange
  onChange = event => {
    this.setState({ search: event.target.value });
  };

  // filter through LexisData to get selected based on id assign to state
  selectedDetail = id => {
    var detail = this.props.LexisData.filter(item => item.id === id);
    this.setState({
      detail: detail[0] //detail is array get first item
    });
  };

  render() {
    const { lexisSelected, lexisFilter } = this.props; //data
    const { selectedLexis,  storeFilters } = this.props; //actions
    const { search } = this.state; //search

    // Probably delete
    // const lexis = null;
    // const lexis = this.filterContacts(lexisStore.state.LexisData, search)
    // {this.filterCategory(lexisStore.state.lexisData, lexisStore.state.lexisFilter)}

    return (
      <div className="lexis-wrapper">
        {/* Filter Group buttons */}
        <Row className="lexis-row">
          <FilterGroup lexisFilter={lexisFilter} storeFilters={storeFilters} />
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
                  // lexisData={this.filterSearch(LexisData, search)}
                  // lexisData={() => this.totalLexis(lexis.state.totalLexis)  }
                  // lexisData={this.filterSearch(this.filterCategory(lexisStore.state.lexisData, lexisStore.state.lexisFilter), search)}

                  lexisData={this.state.totalLexis}
                  selectedDetail={this.selectedDetail}
                  selectedLexis={selectedLexis} // function
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
                <LexisDetail detail={this.state.detail} />
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
  ["lexisSelected", "LexisData", "lexisID", "lexisFilter"],
  actions
)(Lexis);
