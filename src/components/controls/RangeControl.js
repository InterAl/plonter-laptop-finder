import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseFilter} from '../../actions/chosenFiltersActions';
import React, {Component} from 'react';
import Range from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SelectControl.less';

let {PropTypes} = React;

class RangeControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any,
        chooseFilter: PropTypes.func.isRequired
    };

    getDefaultChosenFilter(props) {
        let {filter} = props;

        return props.chosenFilter || {
            min: _.first(filter.options),
            max: _.last(filter.options)
        };
    }

    constructor(props) {
        super();

        const chosenFilter = this.getDefaultChosenFilter(props);

        this.state = {
            min: this.getOptionIdx(chosenFilter.min, props),
            max: this.getOptionIdx(chosenFilter.max, props),
            chosenFilter
        };

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleSliderAfterChange = this.handleSliderAfterChange.bind(this);
        this.formatTooltip = this.formatTooltip.bind(this);
    }

    handleSliderChange([min, max]) {
        this.setState({min, max});
    }

    handleSliderAfterChange([min, max]) {
        min = this.getOptionValue(min);
        max = this.getOptionValue(max);

        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue: {min, max}
        });
    }

    getMarks() {
        let options = this.props.filter.options;
        let chosenFilter = this.state.chosenFilter;

        let minIdx = chosenFilter && this.getOptionIdx(chosenFilter.min);
        let maxIdx = chosenFilter && this.getOptionIdx(chosenFilter.max);

        return _.reduce(options, (acc, cur, idx) => {
            let displayLabel = idx === 0 ||
                               idx === options.length - 1 ||
                               idx === minIdx ||
                               idx === maxIdx ||
                               idx === this.state.min ||
                               idx === this.state.max;

            acc[idx] = {label: displayLabel ? cur : null};

            return acc;
        }, {});
    }

    getOptionValue(idx) {
        return this.props.filter.options[idx];
    }

    getOptionIdx(value, props = this.props) {
        return _.findIndex(props.filter.options, option => option === value);
    }

    getRangeValues() {
        let minValue, maxValue;

        if (this.state.chosenFilter) {
            minValue = this.getOptionIdx(this.state.chosenFilter.min);
            maxValue = this.getOptionIdx(this.state.chosenFilter.max);
        } else {
        }

        return [minValue, maxValue];
    }

    formatTooltip(value) {
        return this.getOptionValue(value);
    }

    render() {
        let {hebvariable} = this.props.filter;

        let marks = this.getMarks();
        let min = 0;
        let max = _.keys(this.props.filter.options).length - 1;

        return (
            <div className='selectControl'>
                <div className='lp-label'>
                    {hebvariable}
                </div>
                <Range
                    tipFormatter={this.formatTooltip}
                    min={min}
                    max={max}
                    value={[this.state.min, this.state.max]}
                    range={true}
                    step={100}
                    marks={marks}
                    onChange={this.handleSliderChange}
                    onAfterChange={this.handleSliderAfterChange}
                />
            </div>
        );
    }
}

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseFilter: bindActionCreators(chooseFilter, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangeControl);
