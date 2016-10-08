import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
    let nextState = {...state};

    switch (action.type) {
        case 'SET_FILTERS': {
            nextState = _.reduce(action.payload, (p, c) => {
                if (c.range > 0) {
                    p[c.engvariable] = {
                        min: c.options[0],
                        max: _.last(c.options)
                    };
                }
                return p;
            }, {});
        }
        break;

        case 'CHOOSE_FILTER': {
            nextState[action.payload.filterName] = action.payload.filterValue;
        }
        break;

        case 'RESET_CHOSEN_FILTERS': {
            nextState = initialState;
        }
    }

    return nextState;
}
