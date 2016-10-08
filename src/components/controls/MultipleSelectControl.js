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

        this.handleSelectChange = this.handleSelectChange.bind(this);
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

        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue: values
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
        let {hebvariable} = this.props.filter;

        return (
            <div className='multiSelectControl'>
                <div className='label'>
                    {hebvariable}
                </div>
                <ReactSelect
                    multi
                    simpleValue
                    onChange={this.handleSelectChange}
                    value={this.props.chosenFilter}
                    options={this.getSelectOptions()}>
                </ReactSelect>
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

export default connect(mapStateToProps, mapDispatchToProps)(MultipleSelectControl);
