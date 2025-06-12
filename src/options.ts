interface Option {
    readonly label: string;
    readonly value: string;
}

export const fieldTypes: Array<Option> = [
    { label: 'Text', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Email', value: 'email' },
    { label: 'Date', value: 'date' },
    { label: 'Select', value: 'select' },
    { label: 'Checkbox', value: 'checkbox' },
];