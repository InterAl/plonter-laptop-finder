import React, {Component} from 'react';
import config from 'config';
import numeral from 'numeral';
import $ from 'jquery';
import './laptopRow.less';

let {PropTypes} = React;

export default class LaptopsRow extends Component {
    static propTypes = {
        laptop: PropTypes.object.isRequired
    };

    constructor() {
        super();

        this.state = {
            imageUrl: null
        };
    }

    componentWillReceiveProps(props) {
        this.fetchImage(props);
    }

    fetchImage(props) {
        let {laptop} = props;

        let url = config.imageUrl.replace('{{filename}}', laptop.image_file);
        let defaultImageUrl = config.defaultImageUrl.replace('{{mfg}}', laptop.description);

        if (laptop.image_file) {
            $.get(url)
                .done(() => this.setState({imageUrl: url}))
                .fail(() => this.setState({imageUrl: defaultImageUrl}));
        } else {
            this.setState({imageUrl: defaultImageUrl});
        }
    }

    getProductUrl(laptop) {
        return config.productLink
                     .replace('{{sku}}', laptop.sku);
    }

    formatPrice(l) {
        let price = l.price_total;
        let cashPrice = 0.98 * price;

        return `₪ ${numeral(price).format('0,0')} / ${numeral(cashPrice).format('0,0')}`;
    }

    render() {
        let {laptop} = this.props;

        return (
            <div className='laptopRow'>
                <div className='price'>
                    {this.formatPrice(laptop)}
                    <br/>
                    <a className='productLink categoryw' target='_blank' href={this.getProductUrl(laptop)}>
                        קישור למוצר
                    </a>
                </div>

                <div className='title'>
                    {laptop.description} - {laptop.sku} - {laptop.title}
                    {laptop.remarks && (
                    <div className='remarks'>
                        <br />
                        {laptop.remarks}
                    </div>)}
                </div>

                <div className='image'>
                    <img src={this.state.imageUrl} />
                </div>
            </div>
        );
    }
}
