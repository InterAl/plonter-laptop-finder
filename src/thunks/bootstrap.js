import _ from 'lodash';
import tsv from 'tsv';
import {setLaptops} from '../actions/laptopsActions';
import {setOptions} from '../actions/optionsActions';
import config from 'config';
import Q from 'q';
import $ from 'jquery';

export default function() {
    return bootstrap;
}

function bootstrap(dispatch) {
    Q.all([$.get(config.laptopsUrl),
           $.get(config.optionsUrl)])
    .spread(parseFiles)
    .then(parsedFiles => {
        dispatch(setLaptops(parsedFiles.laptops));
        dispatch(setOptions(parsedFiles.options));
    })
    .catch(err => console.error(err));
}

function parseFiles(laptops, options) {
    return {
        laptops: parseFile(laptops),
        options: processOptions(parseFile(options))
    };
}

function parseFile(file) {
    let regex = new RegExp(/<pre>(.*?)<\/pre>/ig);
    let tsvTxt = "";
    let match = regex.exec(file);

    while (match != null) {
        tsvTxt += match[1] + "\n";
        match = regex.exec(file);
    }

    let tsvParsed = tsv.parse(tsvTxt);

    return tsvParsed;
}

function processOptions(options) {
    return _.map(options, option => {
        let processedOption = { ...option };

        _.each(processedOption,
               (v, k) => processedOption[k] = _.trim(v))

        if (processedOption.options)
            processedOption.options = processedOption.options.split(',');

        return processedOption;
    });
}
