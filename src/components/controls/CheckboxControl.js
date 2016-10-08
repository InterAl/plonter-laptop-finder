import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseFilter} from '../../actions/chosenFiltersActions';
import './CheckboxControl.less';

let {PropTypes} = React;

class CheckboxControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any
    };

    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let filterValue = !!!this.props.chosenFilter;

        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue
        });
    }

    render() {
        let {engvariable} = this.props.filter;

        return (
            <div className='checkboxControl'>
                <div className='label'>
                    {engvariable}
                </div>
                <input
                    type='checkbox'
                    checked={this.props.chosenFilter}
                    onClick={this.handleClick}
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxControl);
