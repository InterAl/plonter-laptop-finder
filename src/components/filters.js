import _ from 'lodash';
import React, {Component} from 'react';
import FilterRow from './filterRow';
import './filters.less';

let {PropTypes} = React;

export default class Filters extends Component {
    static propTypes = {
        filters: PropTypes.array,
        chosenFilters: PropTypes.object
    };

    constructor() {
        super();

        this.renderFilterRow = this.renderFilterRow.bind(this);
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
                </div>
            </div>
        );
    }
}
