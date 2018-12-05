import React, { Component } from "react";
import { Icon } from "antd";
import _ from 'lodash'

class LexisDetail extends Component {


  componentDidUpdate(prevProps) {
    console.log('update')

    if(this.props.detail === prevProps.detail ) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
           
      console.log('snot same', this.props.detail)
    }
} 
  



    // render variation
    arrayLoop = (arr) => {

        return arr ? arr.map( (item, key) => {
            return `  /  ${item}`
        }) 
        :
        ''
    }

    // render questions and applications
    arrayList = (arr) => {
        
        return arr ? arr.map( (item, key) => {
            return <li key={key}>{item}</li>
        }) 
        :
        ''
    }

    



  render() {
    const { detail } = this.props;

    // console.log(this.props.detail)

 


    if (!detail) {
      return (
        <h2 className="missing-content">
          {" "}
          <Icon type="arrow-left" /> Make rollover new selection
        </h2>
      );
    }

    if (_.isEmpty(detail)) {
      return (
        <h2 className="missing-content">
          {" "}
          <Icon type="arrow-left" /> Try a Different Search or Filter
        </h2>
      );
    }

    const {
      word,
      pos,
      etymology,
      variation,
      quote,
      author,
      book,
      application,
      questions
    } = detail;
    // Add render for Application and questions

    // const numSelected = this.props.lexisSelect


    return (
      <div className="detail-content">
        <h3>{word}</h3>
        <p>{pos}</p>

        {variation ? (
          <p>
            <strong>Variation:</strong> {this.arrayLoop(variation)}{" "}
          </p>
        ) : (
          ""
        )}

        <p>
          <strong>Etymology:</strong> {etymology}
        </p>

        <blockquote>
          <p>{quote}</p>
          <p className="author">
            {book} – {author}
          </p>
        </blockquote>

        {application ? <p><strong>Applications:</strong> {this.arrayList(application)} </p> : ''}
        {questions ? <p><strong>Questions:</strong> {this.arrayList(questions)} </p> : ''}
    
      </div>
    );
  }
}

export default LexisDetail;
