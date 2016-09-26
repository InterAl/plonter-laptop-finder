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
    if (!chosenFilter || chosenFilter === 'All')
        return true;

    let field = filter.name;

    let contains = _.includes(laptop[`${field}_lower`], chosenFilter.toLowerCase());

    return contains;
}
