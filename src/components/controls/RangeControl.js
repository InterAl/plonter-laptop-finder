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

    static defaultProps = {
        chosenFilter: {
            min: 0,
            max: 1
        }
    };

    constructor(props) {
        super();

        this.state = {
            min: this.getOptionIdx(props.chosenFilter.min, props),
            max: this.getOptionIdx(props.chosenFilter.max, props)
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
        let chosenFilter = this.props.chosenFilter;

        let minIdx = chosenFilter && this.getOptionIdx(chosenFilter.min);
        let maxIdx = chosenFilter && this.getOptionIdx(chosenFilter.max);

        return _.reduce(options, (acc, cur, idx) => {
            let displayLabel = idx === 0 ||
                               idx === options.length - 1 ||
                               idx === minIdx ||
                               idx === maxIdx;

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

        if (this.props.chosenFilter) {
            minValue = this.getOptionIdx(this.props.chosenFilter.min);
            maxValue = this.getOptionIdx(this.props.chosenFilter.max);
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
                <div className='label'>
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
