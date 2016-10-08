// import _ from 'lodash';
import React from 'react';
import './app.less';
import bootstrap from '../thunks/bootstrap';
import LaptopsList from './laptopsList';
import Filters from './filters';
import laptopsListSelector from '../selectors/laptopsListSelector';

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
        let filteredLaptops = laptopsListSelector(this.props.state);

        return <LaptopsList laptops={filteredLaptops} />;
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
