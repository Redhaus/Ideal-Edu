import React, { Component } from 'react';
import { Button, Icon } from 'antd'
import { Tag } from 'antd';

const { CheckableTag } = Tag;

export default class LexisFilterButton extends Component {


    constructor(props){
        super(props)

        this.state = {
            checked: this.props.filterSelected
        }
    }

    handleChange = (checked) => {

        this.props.storeFilters(this.props.title)

  
       
        
        this.setState({
            checked: !this.state.checked
        })

        // if(this.props.lexisFilter.length < 1){

        //     console.log('less than one')
        //     this.setState({
        //         checked: false
        //     })
        // }
        


      }

  render() {
    return (

        <CheckableTag checked={this.props.filterSelected} onChange={this.handleChange}> {this.props.title}</CheckableTag>

    )
  }
}
