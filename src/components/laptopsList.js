import _ from 'lodash';
import React, {Component} from 'react';
import LaptopRow from './laptopRow';
import './laptopsList.less';

let {PropTypes} = React;

export default class LaptopsList extends Component {
    static propTypes = {
        laptops: PropTypes.array.isRequired
    };

    renderRow(laptop, idx) {
        return (
            <div className='lp-row' key={idx}>
                <LaptopRow laptop={laptop} />
            </div>
        );
    }

    renderResults() {
        let rows = _.map(this.props.laptops, this.renderRow);

        return (
            <div>
                <div className='resultsCount'>Displaying <span>{rows.length}</span> results</div>
                {rows}
            </div>
        );
    }

    renderSpinner() {

    }

    render() {
        return (
            <div className='laptopsList'>
                {this.renderResults()}
            </div>
        );
    }
}
