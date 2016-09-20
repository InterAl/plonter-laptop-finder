import {setLaptops} from '../actions/laptopsActions';

export default function() {
    return bootstrap;
}

function bootstrap(dispatch) {
    dispatch(setLaptops(['one', 'two']));
}
