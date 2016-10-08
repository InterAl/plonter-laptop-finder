import _ from 'lodash';

const initialState = {};

export default (state = initialState, action) => {
    let nextState = {...state};

    switch (action.type) {
        case 'SET_FILTERS': {
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
