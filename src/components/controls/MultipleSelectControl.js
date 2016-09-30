import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseFilter} from '../../actions/chosenFiltersActions';
import React, {Component} from 'react';
import ReactSelect from 'react-select';
import './MultipleSelectControl.less';
import 'react-select/dist/react-select.css';

let {PropTypes} = React;

class MultipleSelectControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any,
        chooseFilter: PropTypes.func.isRequired
    };

    static defaultProps = {
        chosenFilter: []
    };

    constructor(props) {
        super(props);

        this.state = {
            chosenFilter: this.getValue(props.chosenFilter)
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    getValue(chosenFilter) {
        if (this.props.filter.range) {
            return `${chosenFilter[0]}#${chosenFilter[1]}`;
        } else {
            return chosenFilter;
        }
    }

    handleSelectChange(value) {
        let values = value.split(',');

        if (values.length === 1 && values[0] === '')
            values = [];

        this.setState({
            chosenFilter: values
        })
    }

    handleBlur() {
        let chosenFilter = this.state.chosenFilter;

        if (this.props.filter.range) {
            chosenFilter = _.map(chosenFilter, v => _.map(v.split('#'), v2 => parseFloat(v2)));
        }

        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue: chosenFilter
        });
    }

    getSelectOptions() {
        return _.map(this.props.filter.options, value => {
            if (this.props.filter.range) {
                return {
                    value: this.getValue(value),
                    label: `${value[1]} - ${value[0]}`
                }
            } else {
                return {
                    value,
                    label: value
                }
            }
        });
    }

    render() {
        let {options, engvariable, hebvariable} = this.props.filter;

        return (
            <div className='multiSelectControl'>
                <div className='label'>
                    {hebvariable}
                </div>
                <ReactSelect
                    multi
                    simpleValue
                    onBlur={this.handleBlur}
                    onChange={this.handleSelectChange}
                    value={this.state.chosenFilter}
                    options={this.getSelectOptions()}>
                </ReactSelect>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseFilter: bindActionCreators(chooseFilter, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelectControl);
