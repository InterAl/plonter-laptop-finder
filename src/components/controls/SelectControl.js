import _ from 'lodash';
import React, {Component} from 'react';
import './SelectControl.less';

let {PropTypes} = React;

export default class SelectControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any
    };

    render() {
        let {options, engvariable, hebvariable} = this.props.filter;

        return (
            <div className='selectControl'>
                <div className='label'>
                    {engvariable}
                </div>
                <select value={this.props.chosenFilter}>
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
