import type { Color, ColorWeight, ElementState } from "@/Types";

export const getTextColorClass = (color: Color | undefined, elementState: ElementState = 'default'): string => {
    switch (color) {
        case "red":
            if (elementState === 'hover') return 'hover:text-red-600';
            return 'text-red-500';
        case "blue":
            if (elementState === 'hover') return 'hover:text-blue-600';
            return 'text-blue-500';
            break;
        case "green":
            if (elementState === 'hover') return 'hover:text-green-600';
            return 'text-green-500';
        case "yellow":
            if (elementState === 'hover') return 'hover:text-yellow-600';
            return 'text-yellow-500';
        case "purple":
            if (elementState === 'hover') return 'hover:text-purple-600';
            return 'text-purple-500';
        case "pink":
            if (elementState === 'hover') return 'hover:text-pink-600';
            return `text-pink-500`;
        case "orange":
            if (elementState === 'hover') return 'hover:text-orange-600';
            return 'text-orange-500';
        case "gray":
            if (elementState === 'hover') return 'hover:text-gray-600';
            return 'text-gray-500';
        default:
            return 'text-gray-500'; // Default case for undefined or unrecognized color
    }
};

export const getBgColorClass = (color: Color | undefined, weight: ColorWeight, elementState: ElementState = 'default') => {
    switch (color) {
        case "red":
            if (elementState === 'hover') return `hover:bg-red-${weight}`;
            if (elementState === 'dark') return `dark:bg-red-${weight}`;
            return `bg-red-${weight}`;
        case "blue":
            if (elementState === 'hover') return `hover:bg-blue-${weight}`;
            if (elementState === 'dark') return `dark:bg-blue-${weight}`;
            return `bg-blue-${weight}`;
        case "green":
            if (elementState === 'hover') return `hover:bg-green-${weight}`;
            if (elementState === 'dark') return `dark:bg-green-${weight}`;
            return `bg-green-${weight}`;
        case "yellow":
            if (elementState === 'hover') return `hover:bg-yellow-${weight}`;
            if (elementState === 'dark') return `dark:bg-yellow-${weight}`;
            return `bg-yellow-${weight}`;
        case "purple":
            if (elementState === 'hover') return `hover:bg-purple-${weight}`;
            if (elementState === 'dark') return `dark:bg-purple-${weight}`;
            return `bg-purple-${weight}`;
        case "pink":
            if (elementState === 'hover') return `hover:bg-pink-${weight}`;
            if (elementState === 'dark') return `dark:bg-pink-${weight}`;
            return `bg-pink-${weight}`;
        case "orange":
            if (elementState === 'hover') return `hover:bg-orange-${weight}`;
            if (elementState === 'dark') return `dark:bg-orange-${weight}`;
            return `bg-orange-${weight}`;
        case "gray":
            if (elementState === 'hover') return `hover:bg-gray-${weight}`;
            if (elementState === 'dark') return `dark:bg-gray-${weight}`;
            return `bg-gray-${weight}`;
        default:
            return undefined; // Default case for undefined or unrecognized color';
    };
};

export const getBorderColorClass = (color: Color, weight: ColorWeight, elementState: ElementState = 'default') => {
    switch (color) {
        case "red":
            if (elementState === 'hover') return `hover:border-red-${weight}`;
            return `border-red-${weight}`;
        case "blue":
            if (elementState === 'hover') return `hover:border-blue-${weight}`;
            return `border-blue-${weight}`;
        case "green":
            if (elementState === 'hover') return `hover:border-green-${weight}`;
            return `border-green-${weight}`;
        case "yellow":
            if (elementState === 'hover') return `hover:border-yellow-${weight}`;
            return `border-yellow-${weight}`;
        case "purple":
            if (elementState === 'hover') return `hover:border-purple-${weight}`;
            return `border-purple-${weight}`;
        case "pink":
            if (elementState === 'hover') return `hover:border-pink-${weight}`;
            return `border-pink-${weight}`;
        case "orange":
            if (elementState === 'hover') return `hover:border-orange-${weight}`;
            return `border-orange-${weight}`;
        case "gray":
            if (elementState === 'hover') return `hover:border-gray-${weight}`;
            return `border-gray-${weight}`;
        default:
            return color;
    };
};