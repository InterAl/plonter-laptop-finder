import React, {Component} from 'react';
import './CheckboxControl.less';

let {PropTypes} = React;

export default class CheckboxControl extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        chosenFilter: PropTypes.any
    };

    render() {
        let {options, engvariable, hebvariable} = this.props.filter;

        return (
            <div className='checkboxControl'>
                <div className='label'>
                    {engvariable}
                </div>
                <input type='checkbox' checked={this.props.chosenFilter}/>
            </div>
        );
    }
}
