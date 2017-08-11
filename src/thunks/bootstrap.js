import _ from 'lodash';
import tsv from 'tsv';
import {setLaptops} from '../actions/laptopsActions';
import {setFilters} from '../actions/filtersActions';
import {chooseFilter} from '../actions/chosenFiltersActions';
import config from 'config';
import Q from 'q';
import $ from 'jquery';
import queryString from 'query-string';

export default function() {
    return bootstrap;
}

const query = queryString.parse(location.search);

function bootstrap(dispatch) {
    Q.all([$.get(config.laptopsUrl),
           $.get(config.filtersUrl)])
    .spread(parseFiles)
    .then(({laptops, filters}) => {
        dispatch(setLaptops(laptops));

        const restrictedFields = restrictFiltersFromQuerystring(filters);
        dispatch(setFilters(restrictedFields));

        const presetFilters = presetFilterValuesFromQuerystring(filters);

        _.each(presetFilters, filter => {
            dispatch(chooseFilter({
                filterName: filter.filterName,
                filterValue: filter.value
            }))
        });
    })
    .catch(err => console.error(err));
}

function restrictFiltersFromQuerystring(filters) {
    const restrictedFields = query.fields && query.fields.split(',');

    if (restrictedFields) {
        const fields = _.filter(filters, filter => {
            return _.includes(restrictedFields, filter.engvariable);
        });

        return fields;
    }

    return filters;
}

function presetFilterValuesFromQuerystring(filters) {
    const allFilterNames = _.map(filters, 'engvariable');
    const filtersFromQs = _(allFilterNames)
        .map(filterName => ({ filterName, value: query[filterName] }))
        .filter(f => f.value)
        .map(f => ({...f, value: f.value.split(',')}))
        .value();

    return filtersFromQs;
}

function parseFiles(rawLaptops, filters) {
    let laptops = processLaptops(parseFile(rawLaptops));

    return {
        laptops,
        filters: processFilters(parseFile(filters), laptops)
    };
}

function parseFile(file) {
    let regex = new RegExp(/<pre>(.*?)<\/pre>/ig);
    let tsvTxt = ''
    let match = regex.exec(file);

    while (match != null) {
        tsvTxt += match[1] + '\n';
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
        return match && parseFloat(match);
    }

    function extractScreenSize(title) {
        let regex = new RegExp(/(([0-9]*[.])?[0-9]+) inch/gi);
        let matches = regex.exec(title);
        let match = matches && matches[1];
        return match && parseFloat(match);
    }

    function extractStorageSize(title) {
        let regex = new RegExp(/(([0-9]*[.])?[0-9]+)(gb|tb)/gi);
        let matches = regex.exec(title);

        while (matches !== null) {
            let unit = matches[3].toLowerCase() === 'tb' ? 1000 : 1;
            let size = parseInt(matches[1]);
            let totalSize = unit * size;

            if (totalSize > 100)
                return totalSize;

            matches = regex.exec(title);
        }

        return null;
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
        laptop.screenSize = extractScreenSize(laptop.title);
        laptop.storageSize = extractStorageSize(laptop.title);
    });

    return laptops;
}

function processFilters(filters, laptops) {
    let processed = _.map(filters, filter => {
        let processedFilter = { ...filter };

        _.each(processedFilter,
               (v, k) => processedFilter[k] = _.trim(v))

        if (processedFilter.options)
            processedFilter.options = processedFilter.options.split(',');

        processedFilter.sort = parseInt(processedFilter.sort);
        processedFilter.range = parseInt(processedFilter.range);

        if (processedFilter.engvariable === 'Weight') {
            processedFilter.options = extractRanges(processedFilter.options);
            processedFilter.name = 'weight';
        } else if (processedFilter.engvariable === 'Screen Size') {
            processedFilter.options = extractRanges(processedFilter.options);
            processedFilter.name = 'screenSize';
        } else if (processedFilter.engvariable === 'Capacity') {
            processedFilter.name = 'storageSize';
        } else if (processedFilter.engvariable === 'Price') {
            processedFilter.options = extractPriceRanges(laptops);
        }

        return processedFilter;
    });

    let freeTextFilter = {
        engvariable: 'חיפוש חופשי',
        type: 'freeText',
        sort: 0,
        name: ['description', 'title', 'sku', 'remarks']
    };

    processed.unshift(freeTextFilter);

    return processed;
}

function extractRanges(options) {
    let ranges = _.map(options, v => {
        let values = v.split(' ');
        return _.map(values, v => parseFloat(v));
    });

    return _(ranges).flatten().uniq().value();
}

function extractPriceRanges(laptops) {
    let minPrice = _.minBy(laptops, l => l.price_total);
    let maxPrice = _.maxBy(laptops, l => l.price_total);
    let step = 500;
    let range = [];

    for (var i = minPrice.price_total; i < maxPrice.price_total; i += step) {
        range.push(i);
    }

    return range;
}
