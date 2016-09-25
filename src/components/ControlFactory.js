import CheckboxControl from './CheckboxControl';
import SelectControl from './SelectControl';

export default function createControl(option) {
    let control;

    switch (option.type) {
        case 'select':
            control = createSelectControl(option);
            break;
        case 'choose':
            control = createCheckboxControl(option);
            break;
    }

    return control;
}

function createSelectControl(option) {
    return <SelectControl option={option} />;
}

function createCheckboxControl(option) {
    return <CheckboxControl option={option} />;
}
