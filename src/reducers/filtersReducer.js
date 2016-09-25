const initialState = [];

export default (state = initialState, action) => {
    let nextState = [...state];

    switch (action.type) {
        case 'SET_FILTERS': {
            nextState = action.payload;
        }
        break;
    }

    return nextState;
}
