import { useState } from 'react';
import { Button } from '../../primitives/button';
import { Input } from '../../primitives/input';
import { Label } from '../../primitives/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../primitives/select';
import { Checkbox } from '../../primitives/checkbox';
import { Textarea } from '../../primitives/textarea';
import { fieldTypes } from '@/options';

interface FieldFormProps {
    readonly onSubmit?: (fieldData: FieldData) => void;
    readonly onCancel?: () => void;
    readonly initialData?: Partial<FieldData>;
}

interface FieldData {
    readonly name: string;
    readonly type: string;
    readonly label: string;
    readonly placeholder?: string;
    readonly required: boolean;
    readonly description?: string;
}

export function FieldForm({ onSubmit, onCancel, initialData }: FieldFormProps) {
    const [fieldData, setFieldData] = useState<FieldData>({
        name: initialData?.name ?? '',
        type: initialData?.type ?? 'text',
        label: initialData?.label ?? '',
        placeholder: initialData?.placeholder ?? '',
        required: initialData?.required ?? false,
        description: initialData?.description ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(fieldData);
    };

    const updateField = (key: keyof FieldData, value: any) => {
        setFieldData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="field-name">Field Name</Label>
                <Input
                    id="field-name"
                    value={fieldData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter field name"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="field-type">Field Type</Label>
                <Select value={fieldData.type} onValueChange={(value) => updateField('type', value)}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select field type" />
                    </SelectTrigger>
                    <SelectContent>
                        {fieldTypes.map((field) => (
                            <SelectItem key={field.value} value={field.value}>
                                {field.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="field-label">Label</Label>
                <Input
                    id="field-label"
                    value={fieldData.label}
                    onChange={(e) => updateField('label', e.target.value)}
                    placeholder="Enter field label"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="field-placeholder">Placeholder</Label>
                <Input
                    id="field-placeholder"
                    value={fieldData.placeholder}
                    onChange={(e) => updateField('placeholder', e.target.value)}
                    placeholder="Enter placeholder text"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="field-description">Description</Label>
                <Textarea
                    id="field-description"
                    value={fieldData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Enter field description"
                    rows={3}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="field-required"
                    checked={fieldData.required}
                    onCheckedChange={(checked) => updateField('required', checked)}
                />
                <Label htmlFor="field-required">Required field</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    Create Field
                </Button>
            </div>
        </form>
    );
}
