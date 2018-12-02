  // TODO: Filter and connect work but filter is one click behind
// MAKE SELECTED DETAIL FUNCTION WORK




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

  componentDidMount(){

    this.props.detailUpdate();


  }

  // componentWillUpdate(){
  //   this.setState({
  //     detail: this.props.filteredLexis[0]
  //   })
  // }

  // componentDidUpdate(){

  //   console.log('update')
    
  // }

  // this filters via search accepts lexis array, search term, and filters
  // filterSearch = (lexis, search) => {
  //   search = search.toUpperCase();
  //   // console.log("fired");
  //   return search
  //     ? lexis.filter(lexis => lexis.word.toUpperCase().includes(search))
  //     : lexis;
  // };

  // detailUpdate = () => {
  //   this.setState({
  //     detail: this.props.filteredLexis[0]
  //   })
  // }

  filterTest = () => {

  //   if(this.filters){
  //   const filters = this.props.lexisFilter;

  //   // maps though each lex object to get to icons array
  //   this.state.totalLexis.map(item => {
  //     // const tempLexis = filters.some(ele => item.icons.includes(ele))
  //     // const filteredLexis = this.props.LexisData.filter(item => filters.some(ele => item.icons.includes(ele))  )

  //     // filter through lex icons to compare icons arr with filter arr if no difference keep it in
  //     const filteredLexis = this.props.LexisData.filter(
  //       item => _.difference(filters, item.icons).length === 0
  //     );

  //     this.setState({
  //       totalLexis: filteredLexis
  //     });

  //     return console.log(filteredLexis);
  //   });
  // }else{
  //   return this.state.totalLexis;
  // }
  };

  // filterGalleryClick = () => {
  //  console.log('filter changed')
  // }

  // This is the function that will filter the totalLexis based on category selections
  // filterCategory = filters => {
  //   // this.setState({ filters: true });
  //   // console.log(this.filterTest());


  //   if(this.props.lexisFilter.length > 0){
  //     console.log("filterCalled");

  //     const filters = this.props.lexisFilter;
  
  //     // maps though each lex object to get to icons array
  //     this.state.totalLexis.map(item => {
  //       // const tempLexis = filters.some(ele => item.icons.includes(ele))
  //       // const filteredLexis = this.props.LexisData.filter(item => filters.some(ele => item.icons.includes(ele))  )
  
  //       // filter through lex icons to compare icons arr with filter arr if no difference keep it in
  //       const filteredLexis = this.props.LexisData.filter(
  //         item => _.difference(filters, item.icons).length === 0
  //       );
  
  //       this.setState({
  //         totalLexis: filteredLexis
  //       });

  //       // console.log(filteredLexis);
  
  //       return this.state.totalLexis;
  //     });
  //   }else{
  //   console.log("lexCalled");

  //     return this.state.totalLexis;
  //   }

  // };

  filterHelper = (props) => {
    this.props.filterCategory()
    this.props.detailUpdate();
    this.props.filterSearch()


    // const lex = this.props.filteredLexis;

    // this.setState({
    //   detail: lex[0]
    // })
  }

  //  search onchange function call
  onChange = event => {
    console.log("change fired");
    // store search term in var
    let searchUpdate = event.target.value;
    this.props.filterCategory();
    this.props.searchTerm(searchUpdate)

    // update search state, once search updated callback function to filter totalLexis
    this.setState(
      () => {
        return { search: searchUpdate };
      },
      () => {
        // this.props.filterSearch(this.props.LexisData, this.state.search)
        // this.setState({
        //   totalLexis: this.filterSearch(this.props.LexisData, this.state.search)
        // });
      }
    );
    // this.props.filterSearch(this.props.LexisData, searchUpdate)
    this.props.filterSearch(searchUpdate)
    this.props.detailUpdate();


    // this.setState({
    //   totalLexis: this.filterSearch(this.props.LexisData, this.state.search)
    // });
  };

  // filter through LexisData to get selected based on id assign to state
  selectedDetail = id => {

    this.props.detailRollover(id);
    // var detail = this.props.filteredLexis.filter(item => item.id === id);
    // this.setState({
    //   detail: detail[0] //detail is array get first item
    //   // detail: this.props.LexisDetail //detail is array get first item

    // });
  };

  render() {

    // this.props.filterSearch();
    const { lexisSelected, lexisFilter } = this.props; //data
    const { selectedLexis, storeFilters, filterCategory } = this.props; //actions
    const { search } = this.state; //search


    return (
      <div className="lexis-wrapper">
        {/* Filter Group buttons */}
        <Row className="lexis-row">
          <FilterGroup
            
            filterCategory={this.filterHelper}
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
                  // lexisData={this.state.totalLexis}
                  // lexisData={this.myLex()}
                  lexisData={this.props.filteredLexis}


                  // lexisData={this.state.filters ? this.filterTest : this.state.totalLexis}

                  selectedDetail={this.selectedDetail}
                  // selectedDetail={this.props.lexisDetail}

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
