import _ from 'lodash';
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
            {
                _(this.props.state.laptops).take(50).map(l => {
                    return (
                        <div>
                            {JSON.stringify(l)}
                        </div>
                    )
                }).value()
            }
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
    state: {laptops:[]}
};

export default AppComponent;
