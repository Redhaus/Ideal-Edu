  // TODO: Filter and connect work but filter is one click behind





import React, { Component } from "react";
import _ from "lodash";

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

  // this filters via search accepts lexis array, search term, and filters
  filterSearch = (lexis, search) => {
    search = search.toUpperCase();
    // console.log("fired");
    return search
      ? lexis.filter(lexis => lexis.word.toUpperCase().includes(search))
      : lexis;
  };

  filterTest = () => {
    const filters = this.props.lexisFilter;

    // maps though each lex object to get to icons array
    this.state.totalLexis.map(item => {
      // const tempLexis = filters.some(ele => item.icons.includes(ele))
      // const filteredLexis = this.props.LexisData.filter(item => filters.some(ele => item.icons.includes(ele))  )

      // filter through lex icons to compare icons arr with filter arr if no difference keep it in
      const filteredLexis = this.props.LexisData.filter(
        item => _.difference(filters, item.icons).length === 0
      );

      this.setState({
        totalLexis: filteredLexis
      });

      return console.log(filteredLexis);
    });
  };

  // This is the function that will filter the totalLexis based on category selections
  filterCategory = filters => {
    console.log("filterCalled");
    this.setState({ filters: true });
    console.log(this.filterTest());
  };

  //  search onchange function call
  onChange = event => {
    console.log("change fired");
    // store search term in var
    let searchUpdate = event.target.value;

    // update search state, once search updated callback function to filter totalLexis
    this.setState(
      () => {
        return { search: searchUpdate };
      },
      () => {
        this.setState({
          totalLexis: this.filterSearch(this.props.LexisData, this.state.search)
        });
      }
    );

    this.setState({
      totalLexis: this.filterSearch(this.props.LexisData, this.state.search)
    });
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
    const { selectedLexis, storeFilters } = this.props; //actions
    const { search } = this.state; //search

    return (
      <div className="lexis-wrapper">
        {/* Filter Group buttons */}
        <Row className="lexis-row">
          <FilterGroup
            filterCategory={this.filterCategory}
            lexisFilter={lexisFilter}
            storeFilters={storeFilters}
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
                  lexisData={this.state.totalLexis}
                  // lexisData={this.state.filters ? this.filterTest : this.state.totalLexis}

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
