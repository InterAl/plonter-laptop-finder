import tsv from 'tsv';
import {setLaptops} from '../actions/laptopsActions';
import config from 'config';
import Q from 'q';
import $ from 'jquery';

export default function() {
    return bootstrap;
}

function bootstrap(dispatch) {
    $.get(config.laptopsUrl)
    .then(parseFile)
    .then(products => {
        dispatch(setLaptops(products));
    });
}

function parseFile(file) {
    let regex = new RegExp(/<pre>(.*?)<\/pre>/g);
    let tsvTxt = "";
    let match = regex.exec(file);

    while (match != null) {
        tsvTxt += match[1] + "\n";
        match = regex.exec(file);
    }

    let tsvParsed = tsv.parse(tsvTxt);

    return tsvParsed;
}
