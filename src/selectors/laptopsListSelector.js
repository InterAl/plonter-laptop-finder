import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.laptops,
    state => state.filters,
    state => state.chosenFilters,

    (laptops, filters, chosenFilters) => {
        return _(laptops)
            .filter(laptop => {
                let satisfiesAll = _.every(filters, filter => {
                    let chosenFilter = chosenFilters[filter.engvariable];
                    return satisfies(filter, chosenFilter, laptop);
                });

                return satisfiesAll;
            })
            .sortBy(['price_total'])
            .value();
    }
);

function satisfies(filter, chosenFilter, laptop) {
    if (!chosenFilter || chosenFilter === 'All' || chosenFilter.length === 0)
        return true;

    let field = filter.name;

    let contains;

    if (filter.type === 'multiple') {
        if (filter.range > 0) {
            contains = isFieldInRange(laptop, field, chosenFilter);
        } else {
            contains = _.some(chosenFilter, filter => laptopFieldContains(laptop, field, filter));
        }
    } else if (filter.type === 'freeText') {
        contains = freeTextSearch(laptop, field, chosenFilter);
    } else {
        contains = laptopFieldContains(laptop, field, chosenFilter);
    }

    // if (!contains)
    //     console.log('not satisfied', {filter, chosenFilter, laptop});
    //
    return contains;
}

function freeTextSearch(laptop, fields, value) {
    let fieldValues = _.map(fields, f => laptop[`${f}_lower`]);
    let words = value.split(' ');
    return _.every(words, w => _.some(fieldValues, fv => _.includes(fv, w.toLowerCase())));
}

function laptopFieldContains(laptop, fieldName, filterValue) {
    return _.includes(laptop[`${fieldName}_lower`], filterValue.toString().toLowerCase());
}

function isFieldInRange(laptop, fieldName, chosenFilter) {
    let {min, max} = chosenFilter;

    if (fieldName === 'storageSize') {
        min = calculateStorageSize(min);
        max = calculateStorageSize(max);
    }

    return min <= laptop[fieldName] && laptop[fieldName] <= max;
}

function calculateStorageSize(str) {
    let unit = str.substring(str.length - 2);
    let unitNum = unit.toLowerCase() === 'tb' ? 1000 : 1;
    let size = parseInt(str);
    return size * unitNum;
}
