const initialState = [];

export default (state = initialState, action) => {
    let nextState = [...state];

    switch (action.type) {
        case 'SET_OPTIONS': {
            nextState = action.payload;
        }
        break;
    }

    return nextState;
}
