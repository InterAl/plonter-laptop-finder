import _ from 'lodash';
import React from 'react';
import './app.less';
import bootstrap from '../thunks/bootstrap';
import LaptopsList from './laptopsList';
import Filters from './filters';

class AppComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(bootstrap());
    }

    renderFilters() {
        return (
            <Filters
                filters={this.props.state.filters}
                chosenFilters={this.props.state.chosenFilters}
            />
        );
    }

    renderLaptopsList() {
        let laptops = _(this.props.state.laptops).take(50).value();

        return <LaptopsList laptops={laptops} />;
    }

    render() {
        return (
            <div className="index">
                {this.renderLaptopsList()}
                {this.renderFilters()}
            </div>
        );
    }
}

AppComponent.defaultProps = {
    state: {laptops:[]}
};

export default AppComponent;
