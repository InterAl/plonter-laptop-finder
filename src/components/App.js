import React from 'react';
import './app.css';
import bootstrap from '../thunks/bootstrap';

class AppComponent extends React.Component {
  componentDidMount() {
      this.props.dispatch(bootstrap());
  }

  render() {
    return (
      <div className="index">
        <div className="notice">
          Please edit <code>src/components/App.js</code> to get started!
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
