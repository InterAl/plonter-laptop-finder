import _ from 'lodash';
import tsv from 'tsv';
import {setLaptops} from '../actions/laptopsActions';
import {setFilters} from '../actions/filtersActions';
import config from 'config';
import Q from 'q';
import $ from 'jquery';

export default function() {
    return bootstrap;
}

function bootstrap(dispatch) {
    Q.all([$.get(config.laptopsUrl),
           $.get(config.filtersUrl)])
    .spread(parseFiles)
    .then(parsedFiles => {
        dispatch(setLaptops(parsedFiles.laptops));
        dispatch(setFilters(parsedFiles.filters));
    })
    .catch(err => console.error(err));
}

function parseFiles(laptops, filters) {
    return {
        laptops: processLaptops(parseFile(laptops)),
        filters: processFilters(parseFile(filters))
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

function processLaptops(laptops) {
    function extractWeight(title) {
        let regex = new RegExp(/(([0-9]*[.])?[0-9]+)kg/gi);
        let matches = regex.exec(title);
        let match = matches && matches[1];
        return match && parseInt(match);
    }

    _.each(laptops, laptop => {
        _.each(laptop, (v, k) => {
            let val = laptop[k];

            if (typeof val === 'string') {
                let lowerKey = `${k}_lower`;
                laptop[lowerKey] = laptop[k].toLowerCase();
            }
        });

        laptop.weight = extractWeight(laptop.title);
    });

    return laptops;
}

function processFilters(filters) {
    return _.map(filters, filter => {
        let processedFilter = { ...filter };

        _.each(processedFilter,
               (v, k) => processedFilter[k] = _.trim(v))

        if (processedFilter.options)
            processedFilter.options = processedFilter.options.split(',');

        processedFilter.sort = parseInt(processedFilter.sort);

        return processedFilter;
    });
}
