import { Calendar, Check, Hash, SquareCheck, Type } from "lucide-react";

export function FieldTypeIcon({ type }: Readonly<{ readonly type: string }>) {
    switch (type) {
        case 'single-line-text':
            return <Type />;
        case 'number':
            return <Hash />;
        case 'date':
            return <Calendar />;
        case 'select':
            return <Check />;
        case 'checkbox':
            return <SquareCheck />;
    }
}
