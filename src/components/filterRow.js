import React, {Component} from 'react';
import ControlFactory from './controls/ControlFactory';
import './filterRow.less';

let {PropTypes} = React;

export default class FilterRow extends Component {
    static propTypes = {
        filter: PropTypes.object,
        chosenFilter: PropTypes.string
    };

    createControl() {
        let Control = ControlFactory(this.props.filter, this.props.chosenFilter);
        return Control;
    }

    render() {
        return (
            <div className='filterRow'>
                {this.createControl()}
            </div>
        );
    }
}

