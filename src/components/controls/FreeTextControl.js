import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {chooseFilter} from '../../actions/chosenFiltersActions';
import './FreeTextControl.less';

let {PropTypes} = React;

class FreeTextControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any
    };

    constructor() {
        super();

        this.handleChange = _.debounce(this.handleChange, 500).bind(this);
    }

    handleChange(filterValue) {
        this.props.chooseFilter({
            filterName: this.props.filter.engvariable,
            filterValue
        });
    }

    render() {
        let {engvariable} = this.props.filter;

        return (
            <div className='freeTextControl'>
                <div className='lp-label'>
                    {engvariable}
                </div>
                <input
                    onChange={ev => this.handleChange(ev.target.value)}
                    type='text'
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

export default connect(mapStateToProps, mapDispatchToProps)(FreeTextControl);
