import React from 'react';

const LexisHOC = (WrappedComponent) => {
  class HOC extends React.Component {
    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }
    
  return HOC;
};

export default LexisHOC;