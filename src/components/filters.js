import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterRow from './filterRow';
import {resetChosenFilters} from '../actions/chosenFiltersActions';
import ResetButton from './icons/resetIcon';
import { StickyContainer, Sticky } from 'react-sticky';
import cx from 'classnames';
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

    renderFilterRow(filter, idx) {
        let chosenFilter = this.props.chosenFilters[filter.engvariable];

        return (
            <FilterRow key={idx} filter={filter} chosenFilter={chosenFilter} />
        );
    }

    render() {
        let rows = _(this.props.filters)
                        .sortBy(['sort'])
                        .map(this.renderFilterRow)
                        .value();

        return (
            <StickyContainer>
                <Sticky>
                    {({style, isSticky}) => (
                        <div className={cx('filters', {isSticky})}>
                            <div style={style} className='filters-fixed'>
                                {rows}
                                <br/>
                                <br/>
                                <br/>
                                {/* <div className='resetBtnWrapper'> */}
                                {/*     <ResetButton width={24} height={24} onClick={this.handleReset}/> */}
                                {/* </div> */}
                            </div>
                        </div>
                    )}
                </Sticky>
            </StickyContainer>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        reset: bindActionCreators(resetChosenFilters, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
