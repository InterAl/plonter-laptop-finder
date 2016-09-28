import _ from 'lodash';
import {createSelector} from 'reselect';

export default createSelector(
    state => state.laptops,
    state => state.filters,
    state => state.chosenFilters,

    (laptops, filters, chosenFilters) => {
        return _.filter(laptops, laptop => {
            let satisfiesAll = _.every(filters, filter => {
                let chosenFilter = chosenFilters[filter.engvariable];
                return satisfies(filter, chosenFilter, laptop);
            });

            return satisfiesAll;
        });
    }
);

function satisfies(filter, chosenFilter, laptop) {
    if (!chosenFilter || chosenFilter === 'All' || chosenFilter.length === 0)
        return true;

    let field = filter.name;

    let contains;

    if (filter.type === 'multiple') {
        if (filter.range) {
            contains = _.some(chosenFilter, filter => isFieldInRange(laptop, field, filter));
        } else {
            contains = _.some(chosenFilter, filter => laptopFieldContains(laptop, field, filter));
        }
    } else {
        contains = laptopFieldContains(laptop, field, chosenFilter);
    }

    return contains;
}

function laptopFieldContains(laptop, fieldName, filterValue) {
    return _.includes(laptop[`${fieldName}_lower`], filterValue.toLowerCase());
}

function isFieldInRange(laptop, fieldName, value) {
    return value[0] <= laptop[fieldName] && laptop[fieldName] <= value[1];
}
