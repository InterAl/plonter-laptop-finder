import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseFilter} from '../../actions/chosenFiltersActions';
import React, {Component} from 'react';
import './SelectControl.less';

let {PropTypes} = React;

class SelectControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any,
        chooseFilter: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange({target}) {
        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue: target.value
        });
    }

    render() {
        let {options, engvariable, hebvariable} = this.props.filter;

        return (
            <div className='selectControl'>
                <div className='label'>
                    {engvariable}
                </div>
                <select
                    value={this.props.chosenFilter}
                    onChange={this.handleSelectChange}
                >
                    {_.map(options, option => (
                        <option value={option}>
                            {option}
                        </option>
                    ))}
                </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectControl);
