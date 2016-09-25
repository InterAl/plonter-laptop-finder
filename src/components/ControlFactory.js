import CheckboxControl from './CheckboxControl';
import SelectControl from './SelectControl';

export default function createControl(filter) {
    let control;

    switch (filter.type) {
        case 'select':
            control = createSelectControl(filter);
            break;
        case 'choose':
            control = createCheckboxControl(filter);
            break;
    }

    return control;
}

function createSelectControl(filter) {
    return <SelectControl filter={filter} />;
}

function createCheckboxControl(filter) {
    return <CheckboxControl filter={filter} />;
}
