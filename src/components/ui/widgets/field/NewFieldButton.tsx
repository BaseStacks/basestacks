import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../primitives/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../primitives/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../primitives/command';
import { FieldForm } from './FieldForm';
import { fieldTypes } from '@/options';

export function NewFieldButton() {
    const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className='absolute right-0 top-0 translate-x-full w-[42px] h-[42px] border-b border-r rounded-none'
                >
                    <Plus />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                {
                    selectedFieldType === null
                        ? (
                            <Command>
                                <CommandInput placeholder="Search field types..." />
                                <CommandList>
                                    <CommandEmpty>No field types found.</CommandEmpty>
                                    <CommandGroup>
                                        {fieldTypes.map((field) => (
                                            <CommandItem key={field.value} onSelect={() => setSelectedFieldType(field.value)}>
                                                <span>{field.label}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        )
                        : <div className='p-4'>
                            <FieldForm
                                onSubmit={(fieldData) => {
                                    console.log('Field created:', fieldData);
                                    setSelectedFieldType(null);
                                }}
                                onCancel={() => setSelectedFieldType(null)}
                                initialData={{ type: selectedFieldType }}
                            />
                        </div>
                }
            </PopoverContent>
        </Popover>
    );
}
