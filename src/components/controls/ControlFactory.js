import React from 'react';
import CheckboxControl from './CheckboxControl';
import SelectControl from './SelectControl';
import MultipleSelectControl from './MultipleSelectControl';
import RangeControl from './RangeControl';

export default function createControl(filter, chosenFilter) {
    let control;

    switch (filter.type) {
        case 'select':
            control = createSelectControl(filter, chosenFilter);
            break;
        case 'choose':
            control = createCheckboxControl(filter, chosenFilter);
            break;
        case 'multiple':
            if (filter.range > 0)
                control = createRangeControl(filter, chosenFilter);
            else
                control = createMultipleSelectControl(filter, chosenFilter);
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

function createMultipleSelectControl(filter, chosenFilter) {
    return <MultipleSelectControl filter={filter} chosenFilter={chosenFilter} />;
}

function createRangeControl(filter, chosenFilter) {
    return <RangeControl filter={filter} chosenFilter={chosenFilter} />;
}
