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

    getAddToCartUrl(laptop) {
        return config.addToCart
                     .replace('{{sku}}', laptop.sku);
    }

    formatPrice(l) {
        return `${numeral(l.price_total).format('0,0')} NIS`;
    }

    render() {
        let {laptop} = this.props;

        return (
            <div className='laptopRow'>
                <div className='price'>
                    {this.formatPrice(laptop)}
                    <a className='addToCart' href={this.getAddToCartUrl(laptop)}>
                        Add to cart
                    </a>
                </div>

                <div className='title'>
                    {laptop.description} - {laptop.title}
                </div>

                <div className='image'>
                    <img src={this.getImageUrl(laptop)} />
                </div>
            </div>
        );
    }
}
