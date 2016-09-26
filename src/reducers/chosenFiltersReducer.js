import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
    let nextState = {...state};

    switch (action.type) {
        case 'SET_FILTERS': {
            // nextState = _.reduce(action.payload, (p, c) => {
            //     p[c.engvariable] = _.get(c, 'options[0]');
            //     return p;
            // }, {});
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
