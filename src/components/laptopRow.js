import React, {Component} from 'react';
import config from 'config';
import numeral from 'numeral';
import './laptopRow.less';

let {PropTypes} = React;

export default class LaptopsRow extends Component {
    static propTypes = {
        laptop: PropTypes.object.isRequired
    };

    getImageUrl(laptop) {
        return config.imageUrl.replace('{{filename}}', laptop.image_file);
    }

    formatPrice(l) {
        return `₪ ${numeral(l.price_total).format('0,0')}`;
    }

    render() {
        let {laptop} = this.props;

        return (
            <div className='laptopRow'>
                <div className='price'>
                    {this.formatPrice(laptop)}
                </div>

                <div className='title'>
                    {laptop.title}
                </div>

                <div className='image'>
                    <img src={this.getImageUrl(laptop)} />
                </div>
            </div>
        );
    }
}
