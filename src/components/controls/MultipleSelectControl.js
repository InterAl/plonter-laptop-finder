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
            chosenFilter: props.chosenFilter
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue: this.state.chosenFilter
        });
    }

    getSelectOptions() {
        return _.map(this.props.filter.options, value => ({
            value,
            label: value
        }));
    }

    render() {
        let {options, engvariable, hebvariable} = this.props.filter;

        return (
            <div className='multiSelectControl'>
                <div className='label'>
                    {engvariable}
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
