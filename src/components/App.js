import _ from 'lodash';
import React from 'react';
import './app.less';
import bootstrap from '../thunks/bootstrap';
import LaptopsList from './laptopsList';
import Filters from './filters';
import laptopsListSelector from '../selectors/laptopsListSelector';
import FilterIcon from './icons/filterIcon';
import isMobile from './isMobileCheck';
import Spinner from './icons/spinner';

class AppComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            showFilters: !isMobile()
        };
    }

    componentDidMount() {
        this.props.dispatch(bootstrap());
    }

    renderFilters() {
        return this.state.showFilters && (
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

    renderToggleFiltersBtn() {
        return (
            <div className='filterIconBtnWrapper'>
                <FilterIcon
                    width={24}
                    height={24}
                    onClick={() => this.setState({ showFilters: !this.state.showFilters })}
                    isActive={this.state.showFilters}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="index">
                {_.size(this.props.state.laptops) ? [
                    this.renderLaptopsList(),
                    this.renderFilters(),
                    this.renderToggleFiltersBtn()
                ] : (
                    <div className='spinner'>
                        <Spinner/>
                    </div>
                )}
            </div>
        );
    }
}

AppComponent.defaultProps = {
    state: {laptops:[]}
};

export default AppComponent;
