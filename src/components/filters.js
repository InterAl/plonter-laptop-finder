import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterRow from './filterRow';
import {resetChosenFilters} from '../actions/chosenFiltersActions';
import './filters.less';

let {PropTypes} = React;

class Filters extends Component {
    static propTypes = {
        filters: PropTypes.array,
        chosenFilters: PropTypes.object,
        reset: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.renderFilterRow = this.renderFilterRow.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset() {
        this.props.reset();
    }

    renderFilterRow(filter) {
        let chosenFilter = this.props.chosenFilters[filter.engvariable];

        return (
            <FilterRow filter={filter} chosenFilter={chosenFilter} />
        );
    }

    render() {
        let rows = _(this.props.filters)
                        .sortBy(['sort'])
                        .map(this.renderFilterRow)
                        .value();

        return (
            <div className='filters'>
                <div className='filters-fixed'>
                    {rows}
                    <input
                        onClick={this.handleReset}
                        className='resetBtn'
                        type='button'
                        value='Reset' />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        reset: bindActionCreators(resetChosenFilters, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
