import React from 'react';
import CheckboxControl from './CheckboxControl';
import SelectControl from './SelectControl';

export default function createControl(filter, chosenFilter) {
    let control;

    switch (filter.type) {
        case 'select':
            control = createSelectControl(filter, chosenFilter);
            break;
        case 'choose':
            control = createCheckboxControl(filter, chosenFilter);
            break;
    }

    return control;
}

function createSelectControl(filter, chosenFilter) {
    return <SelectControl filter={filter} chosenFilter={chosenFilter} />;
}

function createCheckboxControl(filter, chosenFilter) {
    return <CheckboxControl filter={filter} chosenFilter={chosenFilter} />;
}
