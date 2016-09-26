import _ from 'lodash';
import React from 'react';
import './app.css';
import bootstrap from '../thunks/bootstrap';
import LaptopsList from './laptopsList';

class AppComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(bootstrap());
    }

    renderLaptopsList() {
        let laptops = _(this.props.state.laptops).take(50).value();

        return <LaptopsList laptops={laptops} />;
    }

    render() {
        return (
            <div className="index">
                {this.renderLaptopsList()}
            </div>
        );
    }
}

AppComponent.defaultProps = {
    state: {laptops:[]}
};

export default AppComponent;
