import type { Color, ElementState } from "@/Types";

export const getTextColorClass = (color: Color, elementState: ElementState = 'default'): string => {
    switch (color) {
        case "red":
            if(elementState === 'hover') return 'hover:text-red-600';
            return 'text-red-500';
        case "blue":
            if(elementState === 'hover') return 'hover:text-blue-600';
            return 'text-blue-500';
            break;
        case "green":
            if(elementState === 'hover') return 'hover:text-green-600';
            return 'text-green-500';
        case "yellow":
            if(elementState === 'hover') return 'hover:text-yellow-600';
            return 'text-yellow-500';
        case "purple":
            if(elementState === 'hover') return 'hover:text-purple-600';
            return 'text-purple-500';
        case "pink":
            if(elementState === 'hover') return 'hover:text-pink-600';
            return 'text-pink-500';
        case "orange":
            if(elementState === 'hover') return 'hover:text-orange-600';
            return 'text-orange-500';
        case "gray":
            if(elementState === 'hover') return 'hover:text-gray-600';
            return 'text-gray-500';
        default:
            return color;
    }
};