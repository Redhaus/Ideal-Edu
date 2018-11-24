import React, { Component } from "react";
import ListView from "./ListView";
import LexisDetail from "./LexisDetail";

import { Row, Col, Input } from "antd";
import Scrollbar from "react-smooth-scrollbar";
import LexisData from "../Data_EN/lexisData";
import { Subscribe } from 'unstated'
import LexisStore from '../../Store/LexisStore';

import FilterGroup from './FilterGroup';


const Search = Input.Search;
// const TotalLexis = null;

class Lexis extends Component {
  // setup state for search and detail content and props

  constructor(props) {
    super(props);
    this.state = {
      detail: null,
      search: "",
    };
  }

  // this filters via search accepts lexis array, search term, and filters
  filterSearch = (lexis, search) => {
    search = search.toUpperCase();
    console.log('fired')
    return search
      ? lexis.filter(lexis => lexis.word.toUpperCase().includes(search))
      : lexis;
  };

  
  filterCategory = (lexis, filters) => {


    console.log(filters);
    // const icons
    lexis.map( (item) => {
      console.log(item.icons)
    })
// const testLex = lexis.every(i => filters )    
    return lexis

    // return filters 
    // ? lexis.filter
    // :

    // console.log(this.props.lexisFilter.includes(item))
    // var containsAll = arr1.every(i => arr2.includes(i));

  }

  //  search onchange
  onChange = event => {
    this.setState({ search: event.target.value });
    // this.filterSearch();
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


    // {this.filterCategory(lexisStore.state.lexisData, lexisStore.state.lexisFilter)}
    

    return (

      <Subscribe to={[LexisStore]}>
      {lexisStore => (

       
     
      // {(lexisStore) => {
      //   totalLexis = lexisStore
      // }}
    
    
      <div className="lexis-wrapper">
       <Row className="lexis-row">
      <FilterGroup lexisFilter={lexisStore.state.lexisFilter} storeFilters={lexisStore.storeFilters}></FilterGroup>
      </Row>
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
                  lexisData={this.filterSearch(lexisStore.state.lexisData, search)} 
                  // lexisData={() => this.totalLexis(lexis.state.totalLexis)  } 

                  // lexisData={this.filterSearch(this.filterCategory(lexisStore.state.lexisData, lexisStore.state.lexisFilter), search)} 

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


export default Lexis;